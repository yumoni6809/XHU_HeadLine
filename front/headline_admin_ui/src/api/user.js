// src/api/user.js

import http from './http'

/**
 * 分页查询用户列表
 * 对应后端 POST /admin/user/list
 * 后端使用 @RequestBody Map<String,Object> 接收 JSON 请求体
 */
export const queryPageApi = (params) => {
  // 1. 构造基础请求体
  const data = {
    ...params, // 展开传入的所有参数 (包含 searchForm 中的字段)
    page: params?.page || 1,
    size: params?.size || 10,
  }

  // 2. 清理空字符串，防止后端数字类型字段报错 (例如 role="")
  // 如果你的后端不喜欢接收空字符串，这一步很重要
  Object.keys(data).forEach(key => {
    if (data[key] === '' || data[key] === null || data[key] === undefined) {
      delete data[key]
    }
  })

  return http.post(
    '/admin/user/list',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}

/**
 * 新增用户
 * 对应后端 POST /admin/user/add
 */
export const addUserApi = (user) =>
  http.post(
    '/admin/user/add',
    {
      userName: user.userName,
      password: user.password,
      nickName: user.nickName,
      avatarUrl: user.avatarUrl,
      phone: user.phone,
      role: user.role,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

/**
 * 更新用户
 * 对应后端 POST /admin/user/update
 */
export const updateUserApi = (user) =>
  http.post(
    '/admin/user/update',
    {
      id: user.id,
      userName: user.userName,
      password: user.password,
      nickName: user.nickName,
      avatarUrl: user.avatarUrl,
      phone: user.phone,
      role: user.role,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

/**
 * 删除用户
 * 对应后端 POST /admin/user/delete
 */
export const deleteUserApi = (userOrId) => {
  const payload = typeof userOrId === 'object' ? userOrId : { id: userOrId }
  return http.post('/admin/user/delete', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
