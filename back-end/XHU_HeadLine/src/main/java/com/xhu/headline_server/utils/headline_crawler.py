import requests
import time
import json
import os
import re
from bs4 import BeautifulSoup
from datetime import datetime
from typing import Dict, Any, Optional, Tuple, List
from getpass import getpass

# ============================= 基础配置相关 =============================

_CONFIG_PATH = os.path.join(os.path.dirname(__file__), "crawler_config.json")

_DEFAULT_CONFIG = {
    "JAVA_ENDPOINT": "http://localhost:7111/admin/news/import",
    "AUTH_LOGIN_URL": "http://localhost:7111/admin/login",
    "AUTH_USERNAME_FIELD": "userName",
    "AUTH_PASSWORD_FIELD": "password",
    "AUTH_TOKEN": "",
    "BATCH_SIZE": 10,
    "USER_AGENT": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
}


def load_config() -> Dict[str, Any]:
    if not os.path.exists(_CONFIG_PATH):
        with open(_CONFIG_PATH, "w", encoding="utf-8") as f:
            json.dump(_DEFAULT_CONFIG, f, ensure_ascii=False, indent=2)
        return dict(_DEFAULT_CONFIG)

    try:
        with open(_CONFIG_PATH, "r", encoding="utf-8") as f:
            cfg = json.load(f)
        merged = dict(_DEFAULT_CONFIG)
        merged.update(cfg or {})
        return merged
    except Exception as e:
        print("读取配置失败，使用默认配置:", e)
        return dict(_DEFAULT_CONFIG)


def save_config(config: Dict[str, Any]) -> None:
    try:
        with open(_CONFIG_PATH, "w", encoding="utf-8") as f:
            json.dump(config, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print("保存配置失败:", e)


_config = load_config()


def get_headers() -> Dict[str, str]:
    headers: Dict[str, str] = {
        "User-Agent": _config.get("USER_AGENT", _DEFAULT_CONFIG["USER_AGENT"]),
        "Accept": "application/json, text/javascript, */*; q=0.01",
    }
    token = _config.get("AUTH_TOKEN", "").strip()
    if token:
        if token.lower().startswith("bearer "):
            headers["Authorization"] = token
            pure = token.split(" ", 1)[1]
            headers["token"] = pure
        else:
            headers["Authorization"] = f"Bearer {token}"
            headers["token"] = token
    return headers


# ============================= 登录拿 token =============================

def _extract_token_from_response(resp_json: Dict[str, Any]) -> Optional[str]:
    if not isinstance(resp_json, dict):
        return None
    if resp_json.get("code") != 1:
        return None
    data = resp_json.get("data")
    if isinstance(data, dict):
        token = data.get("token")
        if isinstance(token, str) and token:
            return token
    return None


def login(username: str, password: str) -> bool:
    url = _config.get("AUTH_LOGIN_URL")
    if not url:
        print("未配置 AUTH_LOGIN_URL")
        return False
    ufield = _config.get("AUTH_USERNAME_FIELD", "userName")
    pfield = _config.get("AUTH_PASSWORD_FIELD", "password")
    payload = {ufield: username, pfield: password}
    try:
        resp = requests.post(
            url,
            json=payload,
            headers={"User-Agent": _config.get("USER_AGENT")},
            timeout=10
        )
        print("登录响应状态码:", resp.status_code)
        print("登录响应内容:", resp.text)
        resp.raise_for_status()

        resp_json: Dict[str, Any] = {}
        if resp.headers.get("Content-Type", "").lower().startswith("application/json"):
            resp_json = resp.json()

        token = _extract_token_from_response(resp_json)
        if not token:
            print("登录成功，但未从响应中解析到 token")
            return False

        _config["AUTH_TOKEN"] = token
        save_config(_config)
        print("登录成功，token 已保存。")
        return True
    except Exception as e:
        print("登录失败:", e)
        return False


# ============================= 抓取今日头条列表 =============================

def fetch_feed(
        max_behot_time: int = 0,
        count: int = 20,
        category: str = "news_hot"
) -> Dict[str, Any]:
    url = "https://www.toutiao.com/api/pc/feed/"
    params = {
        "category": category,
        "utm_source": "toutiao",
        "widen": 1,
        "max_behot_time": max_behot_time,
        "tadrequire": "true",
        "as": "A1B2C3",
        "cp": "D4E5F6",
        "count": count,
    }

    r = requests.get(
        url,
        params=params,
        headers={"User-Agent": get_headers().get("User-Agent")},
        timeout=10
    )
    r.raise_for_status()
    data = r.json()

    # 调试：打印前 1 条原始数据，确认有哪些字段
    if data.get("data"):
        print("feed 第一条原始数据:", json.dumps(data.get("data", [])[0], ensure_ascii=False, indent=2))

    return data


# ============================= 抓取文章详情(正文+图片) =============================

def _parse_from_initial_state(html: str) -> Tuple[str, List[str]]:
    """
    优先从页面内嵌的 JSON(State) 中解析出正文和图片列表.
    """
    text = ""
    images: List[str] = []

    # 1) 尝试匹配 window.__INITIAL_STATE__ = {...};
    m = re.search(
        r"window\.__INITIAL_STATE__\s*=\s*({.*?})\s*;\s*</script>",
        html,
        re.S
    )
    if not m:
        # 2) 有些版本用 __NEXT_DATA__ 或其它脚本 id 包裹 JSON
        m = re.search(
            r"id=\"__NEXT_DATA__\"[^>]*>\s*({.*?})\s*</script>",
            html,
            re.S
        )

    if not m:
        return "", []

    try:
        data = json.loads(m.group(1))
    except Exception:
        return "", []

    # 下面字段名根据今日头条页面结构做多种尝试, 尽量兼容更多情况
    article_info = None

    # 常见结构: data.articleInfo
    if isinstance(data, dict):
        article_info = (
                data.get("articleInfo")
                or data.get("article")  # 部分结构
        )

        # 有些结构会嵌套在某个大 key 下面, 这里做一次遍历查找
        if article_info is None:
            for v in data.values():
                if isinstance(v, dict) and "articleInfo" in v:
                    article_info = v.get("articleInfo")
                    break

    if not isinstance(article_info, dict):
        return "", []

    # 尝试从 articleInfo 中拿 HTML 正文
    content_html = article_info.get("content") or article_info.get("content_html") or ""
    if isinstance(content_html, str) and content_html.strip():
        soup = BeautifulSoup(content_html, "html.parser")
        text = soup.get_text("\n").strip()

        # 在 HTML 正文里找所有图片
        for img in soup.find_all("img"):
            src = img.get("src") or img.get("data-src") or img.get("data-original")
            if src:
                images.append(src)

    # 如果上面没拿到图片, 再从结构化字段中找 image_list / imageList
    if not images:
        raw_imgs = (
                article_info.get("image_list")
                or article_info.get("imageList")
                or article_info.get("images")
        )
        if isinstance(raw_imgs, list):
            for it in raw_imgs:
                if isinstance(it, dict):
                    url = (
                            it.get("url")
                            or it.get("pc_url")
                            or it.get("src")
                    )
                    if url:
                        images.append(url)

    return text, images


def extract_article(detail_url: str) -> Tuple[str, list]:
    """
    从详情页尽量获取较长正文 + 图片.
    如果失败, 后面会在 to_import_dto 里用 feed 的 image_list 兜底.
    """
    try:
        resp = requests.get(detail_url, headers=get_headers(), timeout=10)
        resp.raise_for_status()
        html = resp.text

        # 先尝试从内嵌 JSON 中解析
        content, images = _parse_from_initial_state(html)

        # 如果 JSON 方案失败或正文太短, 再用 DOM 兜底
        if not content or len(content) < 50:
            soup = BeautifulSoup(html, "html.parser")
            candidate_selectors = [
                ("div", {"class": "article-content"}),
                ("div", {"class": "article"}),
                ("div", {"class": "article-content-wrap"}),
                ("div", {"class": "tt-article-content"}),
            ]

            best_text = ""
            best_node = None

            for tag_name, attrs in candidate_selectors:
                node = soup.find(tag_name, attrs)
                if not node:
                    continue
                text = node.get_text("\n").strip()
                if len(text) > len(best_text):
                    best_text = text
                    best_node = node

            if len(best_text) < 50:
                for node in soup.find_all(["div", "section", "article"]):
                    text = node.get_text("\n").strip()
                    if len(text) > len(best_text):
                        best_text = text
                        best_node = node

            if best_text:
                content = best_text

            image_urls: List[str] = []

            def _add_img_from_tag(img_tag):
                src = (
                        img_tag.get("src")
                        or img_tag.get("data-src")
                        or img_tag.get("data-original")
                        or img_tag.get("data-url")
                )
                if not src:
                    return
                if src not in image_urls:
                    image_urls.append(src)

            if best_node is not None:
                for img in best_node.find_all("img"):
                    _add_img_from_tag(img)

            if len(image_urls) < 3:
                for img in soup.find_all("img"):
                    _add_img_from_tag(img)
                    if len(image_urls) >= 20:
                        break

            if image_urls:
                images = image_urls

        return content, images
    except Exception as e:
        print("extract_article 错误:", e)
        return "", []


# ============================= 组装为后端需要的 DTO =============================

def to_import_dto(item: Dict[str, Any]) -> Dict[str, Any]:
    """
    组装发送给 Java 后端的 DTO:
    1\) 正文优先使用 extract_article 抓到的 content, 没有就用 abstract.
    2\) 图片优先用详情页 images, 如果为空就兜底使用 feed 的 image_list.
    """
    title = item.get("title") or item.get("abstract") or ""
    source_url = (
            item.get("source_url")
            or item.get("display_url")
            or item.get("article_url")
            or ""
    )
    be_hot_time = (
            item.get("behot_time") or item.get("publish_time") or int(time.time())
    )
    create_time = datetime.fromtimestamp(int(be_hot_time)).strftime(
        "%Y-%m-%d %H:%M:%S"
    )

    detail_full_url = (
        "https://www.toutiao.com" + source_url
        if source_url.startswith("/")
        else source_url
    )

    # 1) 先尝试从详情页抓正文和图片
    content, images = extract_article(detail_full_url)

    # 2) 如果详情页没有图片, 用 feed 里的 image_list 兜底
    if not images:
        feed_imgs: List[str] = []
        raw_list = item.get("image_list") or []
        if isinstance(raw_list, list):
            for img in raw_list:
                if not isinstance(img, dict):
                    continue
                url = img.get("url")
                if not url:
                    continue
                # 把 // 开头的地址补全为 https://
                if isinstance(url, str) and url.startswith("//"):
                    url = "https:" + url
                if url not in feed_imgs:
                    feed_imgs.append(url)
        if feed_imgs:
            images = feed_imgs

    return {
        "id": None,
        "userId": 3,
        "categoryId": 1,
        "title": title,
        "content": content if content else (item.get("abstract") or ""),
        "imagesJson": json.dumps(images, ensure_ascii=False),
        "status": 2,
        "viewCount": item.get("hot_score") or 0,
        "likeCount": 0,
        "commentCount": 0,
        "tag": item.get("tag") or "",
        "createTime": create_time,
        "updateTime": create_time,
        "deleted": 0,
    }


# ============================= 主流程: 登录 + 抓取 + 导入 =============================

def run_once(batch_size: Optional[int] = None) -> None:
    try:
        bs = batch_size or int(_config.get("BATCH_SIZE", 10))
        feed = fetch_feed(count=bs)
        data = feed.get("data", [])
        dtos = []
        for item in data[:bs]:
            dto = to_import_dto(item)
            dtos.append(dto)
            time.sleep(0.5)

        if not dtos:
            print("no data")
            return

        java_endpoint = _config.get("JAVA_ENDPOINT")
        headers = get_headers()
        headers["Content-Type"] = "application/json; charset=utf-8"

        print("即将请求:", java_endpoint)
        print("请求头:", headers)

        r = requests.post(java_endpoint, headers=headers, json=dtos, timeout=60)
        print("POST status:", r.status_code, r.text)
    except Exception as e:
        print("run_once 错误:", e)


# ============================= 脚本入口 =============================

if __name__ == "__main__":
    print("配置文件路径:", _CONFIG_PATH)

    username = input("请输入用户名: ").strip()
    password = getpass("请输入密码(输入时不显示): ").strip()

    if not username or not password:
        print("用户名或密码为空，退出。")
    else:
        ok = login(username, password)
        if ok:
            run_once(batch_size=_config.get("BATCH_SIZE", 10))
        else:
            print("登录失败，无法继续执行。")
