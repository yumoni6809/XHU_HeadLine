import http from './http'

/**
 * 分页查询文章
 * 对应后端 POST /admin/port/page
 * params 结构示例：
 * {
 *   pageNum: 1,
 *   pageSize: 10,
 *   title: '',
 *   authorId: '',
 *   categoryId: '',
 *   status: '',
 * }
 */
export const queryPagePortApi = (params = {}) =>
  http.post(
    '/admin/port/page',
    {
      pageNum: params.pageNum ?? 1,
      pageSize: params.pageSize ?? 10,
      title: params.title || '',
      authorId: params.authorId || '',
      categoryId: params.categoryId || '',
      status: params.status || '',
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

/**
 * 新增文章
 * 对应后端 POST /admin/port/add
 * data 为文章对象
 */
export const addPortApi = (data) =>
  http.post('/admin/port/add', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

/**
 * 更新文章
 * 对应后端 POST /admin/port/update
 */
export const updatePortApi = (data) =>
  http.post('/admin/port/update', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

/**
 * 删除文章
 * 对应后端 POST /admin/port/delete
 * 一般会根据 id 删除
 */
export const deletePortApi = (data) =>
  http.post('/admin/port/delete', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
