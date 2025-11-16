// src/api/user.js

import http from './http'

/**
 * 分页查询用户列表
 * 对应后端 POST /admin/user/list
 * 后端使用 @RequestBody Map<String,Object> 接收 JSON 请求体
 */
export const queryPageApi = (params) =>
  http.post(
    '/admin/user/list',
    {
      // 确保是一个干净的对象，避免响应式数据污染
      userName: params?.userName || '',
      role: params?.role ?? '',
      phone: params?.phone || '',
      page: params?.page || 1,
      size: params?.size || 10,
    },
    {
      headers: {
        // 明确告知后端这是 JSON
        'Content-Type': 'application/json',
      },
    },
  )

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
