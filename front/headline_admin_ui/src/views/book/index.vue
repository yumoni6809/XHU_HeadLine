<script lang="ts">
export default { name: 'BookIndex' }
</script>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { EditPen, Delete } from '@element-plus/icons-vue'
import { queryPageApi, deleteBookApi, addBookApi, updateBookApi } from '@/api/book'
import { curd } from '@/api/curd'
// 声明书籍对象（初始值交给 curd 管理）
const initialBook = {
  id: null,
  bookName: '',
  author: '',
  subject: '',
  ISBN: '',
  isLoan: false,
  publisher: '',
  edition: '',
  price: '',
  index: '',
}

// 数据驱动表单
// 增加了出版社搜索
const formSchemaConfig = [
  { prop: 'bookName', label: '书名', type: 'input', placeholder: '请输入书名' },
  { prop: 'author', label: '作者', type: 'input', placeholder: '请输入作者' },
  { prop: 'subject', label: '类别', type: 'input', placeholder: '请输入类别' },
  { prop: 'publisher', label: '出版社', type: 'input', placeholder: '请输入出版社' },
]

// 使用通用 curd
const {
  item,
  searchForm,
  formSchema,
  list,
  currentPage,
  pageSize,
  total,
  dialogShow,
  dialogTitle,
  search,
  addItem,
  updateItem,
  saveItem,
  deleteItem,
  cancel,
  colWidths,
  handleSizeChange,
  handleCurrentChange,
} = curd(
  { queryPage: queryPageApi, add: addBookApi, update: updateBookApi, del: deleteBookApi },
  {
    initialItem: initialBook,
    formSchema: formSchemaConfig,
    title: '书籍管理',
    labels: {
      bookName: '书名',
      author: '作者',
      subject: '类别',
      publisher: '出版社',
      edition: '版本',
      price: '价格',
      status: '状态',
      actions: '操作',
    },
  },
)

// 兼容原变量名
const book = item
const searchBookForm = searchForm
const bookList = list

// 清空搜索
const clear = () => {
  searchBookForm.bookName = ''
  searchBookForm.author = ''
  searchBookForm.subject = ''
  searchBookForm.publisher = ''
  currentPage.value = 1
  search()
}

// 删除
const delBook = async (row: unknown) => {
  if (!row) return
  try {
    const res = await deleteItem(row)
    if (res && (res.code || res.message)) {
      ElMessage.success(res.message || '删除成功')
      search()
    } else {
      ElMessage.error(res?.message || '删除失败')
      console.error('删除失败', res)
    }
  } catch (err) {
    console.error(err)
    ElMessage.error('请求出错')
  }
}

// 新增
const addBook = addItem

// 编辑
const updateBook = updateItem

// 保存(相比学生类增加了校验)
const saveBook = async () => {
  const payload = JSON.parse(JSON.stringify(book))

  if (
    !payload.bookName ||
    !payload.author ||
    payload.ISBN === null ||
    payload.ISBN === undefined ||
    String(payload.ISBN).trim() === ''
  ) {
    ElMessage.error('请填写 书名、作者、ISBN')
    return
  }

  payload.ISBN = String(payload.ISBN)
  Object.assign(book, payload)

  try {
    const res = await saveItem()
    if (res && (res.code || res.message)) {
      ElMessage.success(res.message || (book.id ? '更新成功' : '添加成功'))
      cancel()
      search()
    } else {
      ElMessage.error(res?.message || '保存失败')
    }
  } catch (err) {
    console.error(err)
    ElMessage.error('请求出错')
  }
}

// 取消
const cancelEdit = cancel
</script>

<template>
  <h2>图书管理</h2>
  <!--搜索栏---->
  <div class="container">
    <el-form :inline="true" :model="searchBookForm" class="inline-form">
      <el-form-item v-for="field in formSchema" :key="field.prop" :label="field.label">
        <component
          v-if="field.type === 'input'"
          :is="'el-input'"
          v-model="searchBookForm[field.prop]"
          :placeholder="field.placeholder"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="addBook">添加</el-button>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
  </div>

  <!--列表-->
  <div class="container" style="margin-top: 10px">
    <el-table :data="bookList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="bookName" :min-width="colWidths.bookName" label="书名" />
      <el-table-column prop="author" :min-width="colWidths.author" label="作者" />
      <el-table-column prop="subject" :min-width="colWidths.subject" label="类别" />
      <el-table-column prop="publisher" :min-width="colWidths.publisher" label="出版社" />
      <el-table-column prop="edition" :min-width="colWidths.edition" label="版本" />
      <el-table-column prop="price" :min-width="colWidths.price" label="价格" />
      <el-table-column label="状态" :min-width="colWidths.status">
        <template #default="{ row }">{{ row.isLoan ? '已借出' : '在库' }}</template>
      </el-table-column>
      <el-table-column label="操作" :min-width="colWidths.actions" width="160">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="updateBook(row)"
            ><el-icon><EditPen /></el-icon> 编辑</el-button
          >
          <el-button type="danger" size="small" @click="delBook(row)"
            ><el-icon><Delete /></el-icon> 删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!--新增/编辑对话框-->
  <el-dialog v-model="dialogShow" :title="dialogTitle" width="720px">
    <el-form :model="book" label-width="120px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="书名">
            <el-input v-model="book.bookName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="作者">
            <el-input v-model="book.author"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="类别">
            <el-input v-model="book.subject"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="ISBN">
            <el-input v-model="book.ISBN"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="出版社">
            <el-input v-model="book.publisher"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="版本">
            <el-input v-model="book.edition"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="价格">
            <el-input v-model="book.price"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否借出">
            <el-switch v-model="book.isLoan" active-text="已借出" inactive-text="在库" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="cancelEdit">取消</el-button>
      <el-button type="primary" @click="saveBook">保存</el-button>
    </template>
  </el-dialog>

  <!--分页-->
  <div class="container" style="margin-top: 10px; text-align: right">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20]"
      :total="total"
      layout="total,sizes,prev,pager,next,jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.container {
  margin: 12px 0;
}
.inline-form {
  gap: 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
