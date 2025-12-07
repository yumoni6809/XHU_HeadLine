import { defineStore, StoreDefinition } from 'pinia'
import {Ref, ref} from 'vue'
import instance from '@/utils/axios/main.js'
import { ElMessage } from 'element-plus'

export const useCommentDetailStore:StoreDefinition = defineStore('CommentDetailInfo', ()=> {
  type CommentInfoType = {
    id:number
    postId:number
    userId:number
    nickName:string
    avatarUrl:string
    content:string
    parentId:number
    likeCount:number
    createTime:string
  }

  // 定义后端数据
  type EndReturnData = {
    totalCount
    list:Array<CommentInfoType>
  }

  // 定义分页相关数据
  const page:Ref<number> =  ref(1)
  const pageSize:Ref<number> = ref(5)
  const totalCount:Ref<number> = ref(100)
  const commentCountList:Ref<Array<CommentInfoType>> = ref([])

  // 重置commentCountList
  const resetCommentCountList = ():void=> {
    commentCountList.value = []
  }

  // 通过后端数据设置commentCountList
  const setCommentCountListFromEndData = (endData:EndReturnData):void => {
    totalCount.value = endData.totalCount
    commentCountList.value = endData.list
  }

  // 通过后端获取到EndData并且设置到store当中
  const getEndDataByFrontDataAndSet = async(articleId:number)=> {
    try{
      const res = await instance.get(`/user/news/${articleId}/comments`, {
        params: {
          page: page.value,
          size: pageSize.value
        }
      })
      if (res.data?.code === 1) {
        setCommentCountListFromEndData(res.data)
      }else {
        ElMessage.error('发生错误：', res.data?.message)
      }
    }catch (err) {
      ElMessage.error('发生未知错误！', err)
    }
  }

  // 设置分页相关数据
  const setPage = (newPage:number)=> {
    page.value = newPage
  }

  const setPageSize = (newPageSize:number)=> {
    pageSize.value = newPageSize
  }

  const setTotalCount = (newTotalCount:number)=> {
    totalCount.value = newTotalCount
  }

  return {
    page,
    pageSize,
    totalCount,
    commentCountList,
    setPage,
    setPageSize,
    setTotalCount,
    getEndDataByFrontDataAndSet,
    resetCommentCountList,
    setCommentCountListFromEndData
  }
})
