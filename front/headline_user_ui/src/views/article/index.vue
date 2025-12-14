<!-- 添加文章 -->
<template>
  <div class="addArticleContainer">
    <div class="add10PxPadding">
      <div class="addArticleComponents">
        <div class="addTitle commonStyle">
          <span>标题</span>
          <el-input placeholder="请输入文章标题" size="large" v-model="articleForm.title" style="width: 60vw"></el-input>
        </div>

        <div class="addCategory commonStyle">
          <span>分类</span>
          <el-select placeholder="请选择文章分类" size="large" v-model="articleForm.categoryId" style="width: 60vw">
            <el-option
              v-for="item in categoryOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>

        <div class="addCover commonStyle">
          <span>封面</span>
          <div class="uploadFunction">
            <el-upload
              ref="uploadRef"
              class="avatar-uploader"
              name="avatarFile"
              v-model:file-list="fileList"
              action="/api/user/upload"
              multiple
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :show-file-list="false"
              :limit="10 - articleForm.coverImages.length"
              :auto-upload="true"
            >

            <!-- 图片列表展示 -->
              <div  class="ImgDisplayComponent" ref="inputRef">
                <el-carousel
                  autoplay="true"
                  interval="3000"
                  class="imgDisplay"
                  indicator-position="none"
                  v-if="articleForm.coverImages.length !== 0"
                >
                  <el-carousel-item v-for="imageUrl in articleForm.coverImages" :key="imageUrl">
                    <img class="carouselImg" :src="imageUrl" alt="">
                  </el-carousel-item>
                </el-carousel>
                <!-- <img class="coverImg" v-if="!articleForm.coverUrl" src="https://s2.loli.net/2025/11/18/CILJ3hmbwnvDP7g.png" /> -->
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </div>
            </el-upload>

            <!-- 上传相关按钮 -->
            <div class="uploadButton">
              <el-button type="primary" @click="openSourcePick">选择图片</el-button>
              <el-button @click="manageImages">管理图片</el-button>

              <!-- 打开对话框 -->
              <el-dialog
                v-model="dialogTableVisible"
                title="管理图片"
                :width="dialogWidth"
                close-on-click-modal="false"
                >
                <div ref="tableWrapper" class="table-wrapper">
                  <el-table
                    class="manageImageTable"
                    :data="coverImageUploadInfoManageTable"
                    stripe="true"
                    highlight-current-row="true"
                  >
                    <el-table-column align="center" header-align="center" property="date" label="预览" class="previewColumn" width="100">
                      <template #default="scope">
                        <img :src="scope.row.imageUrl" class="previewImage" alt="封面预览" >
                      </template>
                    </el-table-column>
                    <el-table-column align="center" header-align="center" property="uploadTime" label="上传时间" class="uploadTimeColumn" :width="uploadTimeWidth"/>
                    <el-table-column align="center" header-align="center" label="操作" class="operationsColumn" width="auto">
                      <template #default="scope">
                        <div class="buttonContainer">
                          <div class="singleButton">
                            <span @click="goUp(scope.$index)" class="goUpButton" >上移</span>
                          </div>
                          <div class="singleButton">
                            <span @click="goDown(scope.$index)" class="goDownButton" >下移</span>
                          </div>
                          <div class="singleButton">
                            <span @click="deleteImage(scope.$index)" class="deleteButton" >删除</span>
                          </div>
                        </div>
                      </template>
                      <!-- <el-button size="small" text="true" type="primary">上移</el-button>
                      <el-button size="small" text="true" type="primary">下移</el-button>
                      <el-button size="small" text="true" type="warning">删除</el-button> -->
                    </el-table-column>
                  </el-table>

                  <!-- 确认或者取消 -->
                  <div class="confirmCoverImagesManagementOrCancel">
                    <el-button type="primary" @click="confirmManageImages">确认</el-button>
                    <el-button @click="resetCoverImageTable">重置</el-button>
                  </div>
                </div>
              </el-dialog>
            </div>
          </div>
        </div>


        <div class="addContent commonStyle">
          <span>编辑内容</span>
          <div class="QuillEntity">
            <QuillEditor
              v-model:content="articleForm.content"
              content-type="html"
              toolbar="full"
              theme="snow"
            />
          </div>
        </div>

        <!-- 提交内容或者单纯保存 -->
        <div class="checkArticleOrSave">
          <el-button type="primary" size="large" @click="submitArticle">发布帖子</el-button>
          <el-button size="large" @click="saveArticle">保存帖子</el-button>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { computed, onMounted, ref, onBeforeUnmount } from 'vue'
import { Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import instance from '@/utils/axios/main.js'
import { useRouter } from 'vue-router';

defineOptions({
  name: 'AddArticlePage'
})

const router = useRouter()
const articleForm = ref({
  title: '',
  coverImages: [],
  content: '',
  // 分类id，想要设置什么分区就会设置什么categoryId
  categoryId: null,
  status: 1
})

// 重置ArticleForm当中的内容
const resetArticleForm = ()=> {
  articleForm.value.title = ''
  articleForm.value.coverImages = []
  articleForm.value.categoryId = null
  articleForm.value.status = 1
  articleForm.value.content = ''
}

const categoryOptions = ref([
  {
    id: 1,
    name: '百合'
  },
  {
    id: 2,
    name: '轻百合'
  },
  {
    id: 3,
    name: '橘系'
  },
  {
    id: 4,
    name: '后宫百合'
  },
  {
    id: 5,
    name: 'NTR Yuri'
  },
])

// 定义上传封面相关api
const inputRef = ref(null)
const uploadRef = ref(null)

// 定义对话框
const dialogTableVisible = ref(false)

// 定义副本元素，也就是在未确认之前管理的表单项目全是单独开辟出来的副本元素
const coverImageUploadInfoManageTable = ref([])

// 封面信息
const coverImageUploadInfo = ref([])


// 给副本赋值
const resetCoverImageTable = ()=> {
  // 先清空
  coverImageUploadInfoManageTable.value = []

  // 再进行赋值
  coverImageUploadInfo.value.forEach((item)=> {
    coverImageUploadInfoManageTable.value.push({
      imageUrl: item.imageUrl,
      uploadTime: item.uploadTime
    })
  })
}

// 将副本写入到正式的实体上去
const tableToTrueImagesInfoEntity = ()=> {
  // 先清空
  coverImageUploadInfo.value = []

  // 再进行赋值
  coverImageUploadInfoManageTable.value.forEach((item)=> {
    coverImageUploadInfo.value.push({
      imageUrl: item.imageUrl,
      uploadTime: item.uploadTime
    })
  })
}

// 定义上移函数
const goUp = (index)=> {
  if (index === 0) {
    // 不能往上移了

  }else {
    // 往上移一格
    const inter = coverImageUploadInfoManageTable.value[index]

    // 交换
    coverImageUploadInfoManageTable.value[index] = coverImageUploadInfoManageTable.value[index - 1]
    coverImageUploadInfoManageTable.value[index - 1] = inter
  }
}

// 定义下移函数
const goDown = (index)=> {
  if (index === coverImageUploadInfoManageTable.value.length - 1) {
    // 不能往下移了

  }else {
    // 往下移一格
    const inter = coverImageUploadInfoManageTable.value[index]

    // 交换
    coverImageUploadInfoManageTable.value[index] = coverImageUploadInfoManageTable.value[index + 1]
    coverImageUploadInfoManageTable.value[index + 1] = inter
  }
}

// 定义删除函数
const deleteImage = (index)=> {
  coverImageUploadInfoManageTable.value.splice(index, 1)
}

// 定义确认函数
const confirmManageImages = ()=> {
  // 将表单中修改项写入到实际当中去
  tableToTrueImagesInfoEntity()

  // 弹出ElMessage
  ElMessage.success('修改成功')

  // 将articleForm当中的Images也进行更新
  // 需要先清空
  articleForm.value.coverImages = []
  coverImageUploadInfo.value.forEach((item, index)=> {
    articleForm.value.coverImages[index] = item.imageUrl
  })

  // 关闭表单
  dialogTableVisible.value = false


}

// 上传成功函数
const handleSuccess = (res)=> {
  // 先判断res
  // 先写0
  if (res.code === 0) {
    articleForm.value.coverImages.push(res.data)
    // articleForm.value.coverImages.push(res.data.url) // 正式用这一行

    // 还要将coverImageUploadInfo也添加
    coverImageUploadInfo.value.push({
      imageUrl: res.data,
      // imageUrl: res.data.url, // 正式用这一行
      uploadTime: new Date().toLocaleString()
    })

    ElMessage.success('图片上传成功')
  } else {
    ElMessage.error('图片上传失败：' + res.message)
  }
}


// 定义选择图片按钮
const openSourcePick = ()=> {
  inputRef.value.click()
}
// 定义管理图片列表函数
const manageImages = ()=> {
  // 将表单赋值
  resetCoverImageTable()

  // 打开对话框
  dialogTableVisible.value = true
}

// 发布帖子
const submitArticle = async ()=> {
  try {
    const res = await instance.post('/user/news/post', articleForm.value)
    if (res.data.code === 1) {
      ElMessage.success('发布新帖成功')
      // 跳转回首页
      router.push('/testHome/home')

      // 清空表单内容
      resetArticleForm()

      // 清空本地存储
      localStorage.removeItem('articleDraft')
    } else {
      ElMessage.error('发布新帖失败：' + res.data.message)
    }
  }catch (err) {
    ElMessage.error('出现未知错误：' + err)
  }
}

// 保存帖子
const saveArticle = ()=> {
  // 保存到本地即可
  localStorage.setItem('savedCoverImageUploadInfo', JSON.stringify(coverImageUploadInfo.value))
  localStorage.setItem('savedArticleFormInfo', JSON.stringify(articleForm.value))

  // 弹出保存成功
  ElMessage.success('保存成功')

  //跳转至首页
  router.push('/testHome/home')
}

// 写一个钩子函数，初始化的时候默认从本地取出来
onMounted(()=> {
  // 添加一个计算视口大小的方法
  window.addEventListener('resize', updateViewportWidth)

  // 并且还要从本地取出数据
  const getImagesInfo = localStorage.getItem('savedCoverImageUploadInfo')
  if (getImagesInfo !== null && getImagesInfo !== undefined) {
    // 设置coverImageUploadInfo
    coverImageUploadInfo.value = JSON.parse(getImagesInfo)
  }

  const getArticleInfo = localStorage.getItem('savedArticleFormInfo')
  if (getArticleInfo !== null && getArticleInfo !== undefined) {
    // 设置articleForm
    articleForm.value = JSON.parse(getArticleInfo)
  }

  // 获取类别(正式版的时候需要换掉)
  getAllCategoriesOptions()
})

// 获取类别
const getAllCategoriesOptions = async ()=> {
  try{
    const res = await instance.get('/user/news/category/list')
    if (res.data.code === 0) {
      // 类别进行赋值
      categoryOptions.value = res.data.data
    } else {
      ElMessage.error('发生错误：' + res.data.message)
    }
  }catch (err) {
    ElMessage.error(err)
  }
}


// 动态计算视口大小
const viewportWidth = ref(window.innerWidth)

const updateViewportWidth = () => {
  viewportWidth.value = window.innerWidth
}

// 定义dialogWidth
const dialogWidth = computed(()=> {
  return viewportWidth.value > 450? 450 : viewportWidth.value
})

// 动态计算上传时间的大小
const uploadTimeWidth = computed(() => {
  if (dialogWidth.value) {
    const wrapperWidth = dialogWidth.value
    return wrapperWidth * 0.33  // 33%
  }else {
   return 120
  }
})
// 在页面渲染之前重新计算视口大小
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewportWidth)
})
</script>

<style scoped>
.addArticleContainer {

  background-color: whitesmoke;
  padding:10px;
  height: 100%;
  overflow: auto;
}
.add10PxPadding {
  display: flex;
  justify-content: center;
  padding:20px;
  border-radius: 10px;
  background-color: white;

}
.addArticleComponents {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.commonStyle {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  gap: 15px;
}

/* 临时添加 */
.avatar-uploader :deep(.el-upload){
  overflow: visible;
}

/* 滑动图片的样式 */
.ImgDisplayComponent {
  width: 300px;
  /* box-shadow: 10px 10px 5px 0 rgba(0, 0, 0, 0.5); */
  border-radius: 10px;
}
.imgDisplay {
  width: 300px;
  box-shadow: 10px 10px 5px 0 rgba(0, 0, 0, 0.5);
}
.carouselImg {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.avatar-uploader-icon {
  height: 300px;
  width: 300px;
  border-radius: 20px;
  border: 2px dashed #efefef;
}
.uploadButton {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap:120px
}

.previewImage {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  object-fit: cover;
}
.buttonContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.goUpButton {
  color: blue;
}
.goDownButton {
   color: aqua;
}
.deleteButton {
  color: orange;
}
.confirmCoverImagesManagementOrCancel {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: flex-end;
}
.QuillEntity {
   min-height: 300px;
   overflow: auto;
}
.addContent {
  border-bottom: 2px solid rgb(223, 228, 228);
}
/* 底部按钮 */
.checkArticleOrSave {
  display: flex;
  flex-direction: row;
  gap: 50px;
  justify-content: center;
  align-items: end;
  margin-top: 20px;
  padding-bottom: 20px;
}

</style>
