import { login } from '@/api/auth/auth'
import { getToken, setToken } from '@/utils/auth'

//state 中状态的改变必须通过mutations 来改变
const state = {
  token: getToken(), // token
  user: '', // 用户对象
}

//不能处理异步请求
const mutations = {
  SET_TOKEN_STATE: (state, token) => {
    state.token = token
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    console.log(userInfo)
    const { name, pass, rememberMe } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: name.trim(), password: pass, rememberMe: rememberMe }).then(response => {
        const { data } = response
        //commit('SET_TOKEN_STATE', data.token) 修改 state中token
        commit('SET_TOKEN_STATE', data.token)
        //修改js-cookie中token
        setToken(data.token)
        //表示操作成功
        resolve()
      }).catch(error => {
        //表示操作失败
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}