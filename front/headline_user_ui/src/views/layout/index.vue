<script setup>
import {  HomeFilled, Plus, Setting, User, Search, Filter } from '@element-plus/icons-vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const jumpToNewRouter = (routeInfo)=> {
  // 更改标题
  title.value = routeInfo.title

  router.push('/layout' + routeInfo.url)
}
const searchContent = ref('')

// 定义当前导航栏显示的标题
const title = ref('咨询头条')

// 定义搜索栏
const filterPanelVisible = ref(false)

// 重置表单
const resetFilterCondition = ()=> {
  //TODO

}

// 确认表单
const confirmFilterCondition = ()=> {
  //TODO

  // 关闭
  filterPanelVisible.value = false
}

// 设置筛选表单的相关元素
const checkList = ref[
  {
    label: '按时间',
    optionItems: [
      '全部',
      '最近一年',
      '最近一个月',
      '最近一周'
    ]
  }
]
</script>

<template>
  <div class="entirePage">
    <!-- 头部，根据route》path来判断 -->
    <div class="upStreamContent">
      <div class="headerComponent">
        <div class="searchComponent">
          <div style="font-size: 16px;">
            <strong>
              {{ title }}
            </strong>
          </div>

          <!-- 只有当当前路径为home的时候才会出现搜索框 -->
          <div style="" v-show="$route.path.split('/')[$route.path.split('/').length - 1] === 'home'">
            <el-input
            type="text"
            v-model="searchContent"
            placeholder="搜索资讯、话题、用户..."
            size="middle"
            :prefix-icon="Search"
            class="my-input"
            style="width: 70vw; border-radius: 10px;"
            />
          </div>
        </div>

        <!-- 条件筛选 -->
        <!-- 只有当当前路径为home的时候才会出现搜索框 -->
        <div class="filterComponentContainer" v-show="$route.path.split('/')[$route.path.split('/').length - 1] === 'home'">
          <el-popover
            v-model:visible="filterPanelVisible"
            placement="bottom"
            width="100vw"
            trigger="click"
            class="filterPopover"
          >
            <!-- 触发弹层的“筛选图标” -->
            <template #reference>
              <el-button circle>
                <el-icon><Filter /></el-icon>
              </el-button>
            </template>

            <div style="background-color: white;" v-show="filterPanelVisible">
              <div class="filterPanel" >
                <!-- 筛选条件 -->
                  <div class="checkTagTitle">
                    <span>按时间</span>
                    <span>按收藏</span>
                    <span>按点赞</span>
                    <span>按浏览量</span>
                  </div>

                  <div class="checkTagItems">

                    <div class="timeCheckTag singleFilterContainer">
                      <el-check-tag :checked="true" type="primary" @change="onChange1">
                        全部
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        最近一年
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        最近一月
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        最近一周
                      </el-check-tag>
                    </div>

                    <div class="attentionCheckTag singleFilterContainer">
                      <el-check-tag :checked="true" type="primary" @change="onChange1">
                        全部
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >100
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >1000
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >5000
                      </el-check-tag>
                    </div>

                    <div class="likeCheckTag singleFilterContainer">
                      <el-check-tag :checked="true" type="primary" @change="onChange1">
                        全部
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >100
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >1000
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >5000
                      </el-check-tag>
                    </div>

                    <div class="viewCheckTag singleFilterContainer">
                      <el-check-tag :checked="true" type="primary" @change="onChange1">
                        全部
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >100
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >1000
                      </el-check-tag>
                      <el-check-tag :checked="checked1" type="primary" @change="onChange1">
                        >5000
                      </el-check-tag>
                    </div>
                  </div>
                </div>

                <div class="checkOrResetButton">
                  <el-button @click="resetFilterCondition">重置</el-button>
                  <el-button type="primary" @click="confirmFilterCondition">确认</el-button>
                </div>

              </div>
            </el-popover>
        </div>
      </div>

      <div class="routerViewContent">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>



    <!-- 底部 -->

    <div class="footerNav">
      <div class="footerContainer">
        <div class="nav-col"
          @click="jumpToNewRouter({
            url: '/home',
            title: '咨询头条'
          })">
            <div :class="{primaryNav:true, activeNav: $route.path.endsWith('/home')}">
              <el-icon  :size="30"><HomeFilled /></el-icon>
            </div>
            <span>
             首页
            </span>

          </div>
          <div class="nav-col"
          @click="jumpToNewRouter({
            url: '/addNewArticle',
            title: '发布新贴'
            })">
            <div :class="{primaryNav:true, activeNav: $route.path.endsWith('/addNewArticle')}">
              <el-icon  :size="30"><Plus /></el-icon>
            </div>
            <span>新建帖子</span>
          </div>
          <div class="nav-col"
          @click="jumpToNewRouter({
            url: '/user',
            title: '个人信息'
            })">
            <div :class="{primaryNav:true, activeNav: $route.path.endsWith('/user')}">
              <el-icon  :size="30"><User /></el-icon>
            </div>
            <span>我的</span>
          </div>
          <div class="nav-col"
          @click="jumpToNewRouter({
            url: '/setting',
            title: '设置'
            })">
            <div :class="{primaryNav:true, activeNav: $route.path.endsWith('/setting')}">
              <el-icon :size="30" class="nav-icon"><Setting /></el-icon>
            </div>
            <span>设置</span>
          </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.entirePage {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
/* 配置顶部样式 */
/* ################################################################## */
/* ################################################################## */
/* ################################################################## */
.headerComponent {
  padding: 20px 10px 20px 10px;
  background-color: white;
  border-bottom: 2px solid whitesmoke;
}

.searchComponent {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;

}
.filterComponentContainer {
  margin-top: 15px;
}
.upStreamContent {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  background-color: whitesmoke;
}
.my-input .el-input__wrapper {
  background-color: #f5f5f5;  /* 浅灰色背景 */
}
.conditionalQuery {
  margin-top: 20px;
  padding-left: 20px;
}

/* 配置条件筛选的样式 */
.filterPanel {
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-top: 20px;
  background-color: white;
  align-items: center;
}
.checkTagTitle {
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 60px;
}
.checkTagItems {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  gap: 10px
}

.singleFilterContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  overflow-x: auto;
  scrollbar-width: none;
  white-space: nowrap;
}
.checkOrResetButton {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: end;
  gap: 20px;
  background-color: white;
}


.routerViewContent {
  flex: 1 1 auto;
  min-height: 0;   /* 非常关键，允许子元素内部滚动 */
  /* width: 100%;
  max-width: 100%; */
}

/* 配置底部样式 */
/* ################################################################## */
/* ################################################################## */
/* ################################################################## */
.footerNav {
  display: flex;
  justify-content: center;
  padding-top: 10px;
  border-top: 2px solid #F0EBEB;
  border-radius: 10px;
}
.primaryNav {
  padding: 0 8px 0 8px;
  border-radius: 40px;
}
.activeNav {
  background-color: rgb(238, 231, 30);

}
.footerContainer {
  display: flex;
  flex-direction: row;
  gap: 15vw;
}
.nav-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav-col :hover {
  cursor: pointer;
}
</style>
