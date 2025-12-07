import { ref, Ref } from "vue";
import { defineStore, StoreDefinition } from 'pinia'

export  const useArticleHomeStore:StoreDefinition = defineStore('ArticleInfo', ()=>{
  type articleHomeInfo = {
    id:number
    title:string
    categoryId:number
    categoryName:string
    authorId:number
    authorName:string
    avatarUrl:string
    coverImages:Array<string>
    status:number
    viewCount:number
    likeCount:number
    commentCount:number
    createTime:number
  }

  type EndReturnArticleDetailDataType = {
    page:number
    size:number
    list:Array<articleHomeInfo>
  }


  const page:Ref<number>= ref(1)
  const size:Ref<number> = ref(10)
  const keyword:Ref<string> = ref('')
  const categoryId:Ref<number | undefined> = ref(undefined)
  const articleList:Ref<Array<articleHomeInfo>> = ref([])

  // 从后端数据设置
  const setArticleHomeInfoFromEnd = (endData:EndReturnArticleDetailDataType):void=> {
    page.value = endData.page
    size.value = endData.size
    articleList.value = endData.list
  }

  return {
    page,
    size,
    keyword,
    categoryId,
    articleList,
    setArticleHomeInfoFromEnd
  }
})
