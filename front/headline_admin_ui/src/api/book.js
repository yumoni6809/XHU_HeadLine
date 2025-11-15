export async function queryPageApi(
  bookName = '',
  author = '',
  subject = '',
  publisher = ' ',
  page = 1,
  size = 10,
) {
  const res = await fetch('/api/book/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookName, author, subject, publisher, page, size }),
  })
  return res.ok ? await res.json() : { code: 0, data: { rows: [], total: 0 } }
}

export async function deleteBookApi(bookOrId) {
  const payload = typeof bookOrId === 'object' ? bookOrId : { id: bookOrId }
  const res = await fetch('/api/book/del', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res.ok ? await res.json() : { code: 0, message: '删除失败' }
}

export async function addBookApi(book) {
  const body = {
    ...book,
    isbn: book.ISBN ?? book.isbn ?? '',
  }
  delete body.ISBN

  console.log('addBookApi send body:', body)
  const res = await fetch('/api/book/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (res.ok) {
    const data = await res.json()
    console.log('addBookApi success:', data)
    return data
  } else {
    const txt = await res.text().catch(() => '')
    console.error('addBookApi server error:', res.status, txt)
    return { code: 0, message: txt || `服务器错误 ${res.status}` }
  }
}

export async function updateBookApi(book) {
  const body = {
    ...book,
    isbn: book.ISBN ?? book.isbn ?? '',
  }
  delete body.ISBN

  console.log('updateBookApi send body:', body)
  const res = await fetch('/api/book/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (res.ok) {
    const data = await res.json()
    console.log('updateBookApi success:', data)
    return data
  } else {
    const txt = await res.text().catch(() => '')
    console.error('updateBookApi server error:', res.status, txt)
    return { code: 0, message: txt || `服务器错误 ${res.status}` }
  }
}
