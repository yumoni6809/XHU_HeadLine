import { Ref, ref } from "vue";
import { defineStore, StoreDefinition } from "pinia";

export const useArticleDetailStore:StoreDefinition = defineStore('ArticleDetailInfo', ()=> {
  type articleDetailInfo = {
    id:number | null,
    title:string,
    categoryId:number | null,
    authorId:number | null,
    avatarUrl:string,
    coverImages:Array<string>,
    status:number,
    viewCount:number,
    likeCount:number,
    commentCount:number,
    createTime:string,
    content:string,
    source:string,
    updateTime:string
  }



  const singleArticleInfo:Ref<articleDetailInfo> = ref({
    id:null,
    title:'',
    categoryId: null,
    authorId:null,
    avatarUrl: '',
    coverImages: [],
    status:0,
    viewCount:0,
    likeCount:0,
    commentCount:0,
    createTime:'',
    content:'',
    source:'',
    updateTime:''
  })

  // 重置articleDetailInfo
  const resetSingleArticleDetailInfo = ():void=> {
    singleArticleInfo.value = {
      id:null,
      title:'',
      categoryId: null,
      authorId:null,
      avatarUrl: '',
      coverImages: [],
      status:0,
      viewCount:0,
      likeCount:0,
      commentCount:0,
      createTime:'',
      content:'',
      source:'',
      updateTime:''
    }
  }

  // 定义状态
  const statusToDescription = {
    0: '待审核',
    1: '发布',
    2: '草稿',
    3: '删除'
  }

  // 从后端得到的信息中设置表单
  const setSingleArticleDetailInfoFromEndData = (endFormData:articleDetailInfo):void=> {
    singleArticleInfo.value.id = endFormData.id ?? null
    singleArticleInfo.value.title = endFormData.title ?? ''
    singleArticleInfo.value.categoryId = endFormData.categoryId ?? null
    singleArticleInfo.value.authorId = endFormData.authorId ?? null
    singleArticleInfo.value.avatarUrl = endFormData.avatarUrl ?? ''
    singleArticleInfo.value.coverImages = endFormData.coverImages ?? []
    singleArticleInfo.value.status = endFormData.status ?? 0
    singleArticleInfo.value.viewCount = endFormData.viewCount ?? 0
    singleArticleInfo.value.likeCount = endFormData.likeCount ?? 0
    singleArticleInfo.value.commentCount = endFormData.commentCount ?? 0
    singleArticleInfo.value.createTime = endFormData.createTime ?? ''
    singleArticleInfo.value.content = endFormData.content ?? ''
    singleArticleInfo.value.source = endFormData.source ?? ''
    singleArticleInfo.value.updateTime = endFormData.updateTime ?? ''
  }

  return {
    singleArticleInfo,
    statusToDescription,
    resetSingleArticleDetailInfo,
    setSingleArticleDetailInfoFromEndData
  }
})
