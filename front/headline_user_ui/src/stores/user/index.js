import { ref } from 'vue'
import { defineStore } from "pinia"

export const useUserStore = defineStore('UserInfo', ()=> {
  const token = ref('')
  const userInfo = ref({
    id: null,
    username: '',
    nickName: '',
    avatarUrl: '',
    role: null,
    phone: ''
  })

  // 重置用户信息
  const resetUserInfo = ()=> {
    userInfo.value.id = null
    userInfo.value.username = ''
    userInfo.value.nickName = ''
    userInfo.value.avatarUrl = ''
    userInfo.value.role = null
  }

  //设置用户信息(包括token)(通常用于查询回显时的修改)
  const setUserInfoAndToken = (newUserInfo)=> {
    token.value = newUserInfo.token
    modifyUserInfo(newUserInfo.user)
    // 还需要设置id
    userInfo.value.id = newUserInfo.user.id
  }

  // 设置用户信息（不包括token），通常用于修改账户属性时
  const modifyUserInfo = (userInfoForm)=> {
    userInfo.value.id = userInfoForm.id
    userInfo.value.username = userInfoForm.username
    userInfo.value.nickName = userInfoForm.nickName
    userInfo.value.avatarUrl = userInfoForm.avatarUrl
    userInfo.value.role = userInfoForm.role
    userInfo.value.phone = userInfoForm.phone
  }
  return {
    token,
    userInfo,
    resetUserInfo,
    setUserInfoAndToken,
    modifyUserInfo
  }
},
{
  persist: {
    key: 'YumoniUserInfoStorage',
    pick: ['token', 'userInfo']
  }
})


