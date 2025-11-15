export async function queryPageApi(userName = '', role = '', phone = '', page = 1, size = 10) {
  const res = await fetch('/api/admin/user/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, role, phone, page, size }),
  })
  return res.ok ? await res.json() : { code: 0, data: { rows: [], total: 0 } }
}

export async function deleteUserApi(userOrId) {
  const payload = typeof userOrId === 'object' ? userOrId : { id: userOrId }
  const res = await fetch('/api/admin/user/del', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res.ok ? await res.json() : { code: 0, message: '删除失败' }
}

export async function addUserApi(user) {
  const body = { ...user }
  delete body.id

  const res = await fetch('/api/admin/user/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (res.ok) {
    return await res.json()
  } else {
    const txt = await res.text().catch(() => '')
    return { code: 0, message: txt || `服务器错误 ${res.status}` }
  }
}

export async function updateUserApi(user) {
  const body = { ...user }
  const res = await fetch('/api/admin/user/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (res.ok) {
    return await res.json()
  } else {
    const txt = await res.text().catch(() => '')
    return { code: 0, message: txt || `服务器错误 ${res.status}` }
  }
}
