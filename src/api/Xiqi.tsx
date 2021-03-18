import httpXiqi from './httpXiqi'

export interface ILoginParamsType {
  email: string
  password?: string
}

// 获得一个随机数token
export function getToken(){    
  return httpXiqi.get('/Login/getRandom')
}

// 登录
export function getLoginResult(params: ILoginParamsType) {
  return httpXiqi.post('/Login/', params)
}
// 注册
export function getSignUpResult(params: ILoginParamsType) {
  return httpXiqi.post('/Login/signUp', params)
}
// 找回密码页面确认邮箱是否正确
export function getEmailResult(params: ILoginParamsType) {
  return httpXiqi.post('/Login/getEmail', params)
}
// 修改密码
export function getUpdatePwdResult(params: ILoginParamsType) {
  return httpXiqi.post('/Login/updatePwd', params)
}

// 订阅
export function getSubscribeResult(params: {email: string}) {
  return httpXiqi.post('/Index/subscribe', params)
}

// 测试本地mock
export function getMockResult() {
  return httpXiqi.get('/test/info')
}
export function getMockPostResult(params: {name: string}) {
  return httpXiqi.post('/test/postInfo', params)
}
