export function queryPageApi(
  bookName?: string,
  author?: string,
  subject?: string,
  publisher?: string,
  page?: number,
  size?: number,
): Promise<any>

export function deleteBookApi(bookOrId: any): Promise<any>

export function addBookApi(book: any): Promise<any>

export function updateBookApi(book: any): Promise<any>
