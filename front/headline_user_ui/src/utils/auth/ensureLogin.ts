import router from '@/router'

/** 返回 true 表示已登录，可继续；false 表示已跳转去登录 */
export function ensureLogin(): boolean {
	const token = localStorage.getItem('token')
	const user = localStorage.getItem('login_user')

	if (token && user) return true

	const current = router.currentRoute.value.fullPath || '/layout/home'
	router.push({ path: '/login', query: { redirect: current } })
	return false
}

切换动画