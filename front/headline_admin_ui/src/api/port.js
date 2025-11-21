//// filepath: f:\Develop\project\XHU_HeadLine\XHU_HeadLine\front\headline_admin_ui\src\api\port.js
import http from './http'

/**
 * 分页查询新闻（newsPort）
 * 对应后端 POST /admin/port/list
 * params: { pageNum, pageSize, title, authorId, categoryId, status }
 */
export const queryPagePortApi = (params = {}) =>
  http.post(
    '/admin/port/list',
    {
      pageNum: params.pageNum ?? 1,
      pageSize: params.pageSize ?? 10,
      title: params.title ?? '',
      authorId: params.authorId ?? '',
      categoryId: params.categoryId ?? '',
      status: params.status,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

/**
 * 新增新闻
 * 对应后端 POST /admin/port/add
 */
export const addPortApi = (data) =>
  http.post('/admin/port/add', data, {
    headers: { 'Content-Type': 'application/json' },
  })

/**
 * 更新新闻
 * 对应后端 POST /admin/port/update
 */
export const updatePortApi = (data) =>
  http.post('/admin/port/update', data, {
    headers: { 'Content-Type': 'application/json' },
  })

/**
 * 删除新闻
 * 对应后端 POST /admin/port/delete
 * 后端期望 { id }
 */
export const deletePortApi = (row) =>
  http.post(
    '/admin/port/delete',
    { id: row.id },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )

/**
 * 按 id 查询单条新闻
 * 对应后端 POST /admin/port/get
 */
export const getPortByIdApi = (id) =>
  http.post(
    '/admin/port/get',
    { id },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
