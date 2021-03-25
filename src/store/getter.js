//state: 表示公共存储 user 表示user.js 文件 token，user分别是user.js 文件中 state 的变量
const getters={
    token: state=>state.user.token,
    user:state=>state.user.user,
}

export default getter