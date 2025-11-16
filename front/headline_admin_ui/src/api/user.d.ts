export function queryPageApi(
  userName?: string,
  role?: string,
  phone?: string,
  page?: number,
  size?: number,
): Promise<any>

export interface LoginUserInfo {
  userId: number
  userName: string
  avatarUrl?: string
  token: string
}

export function deleteUserApi(userOrId: any): Promise<any>

export function addUserApi(user: any): Promise<any>

export function updateUserApi(user: any): Promise<any>
