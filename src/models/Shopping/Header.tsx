import {
  observable,
  makeObservable,
  action
} from 'mobx'

class HeaderStore {
  constructor(){
    makeObservable(this)
  }
  @observable type = 0
  @observable isLogin = 0
  
  @action.bound
  changeType(newType: number){
    this.type = newType
  }
  @action.bound
  changeIsLogin(isLogin: number){
    this.isLogin = isLogin
  }
}

export default new HeaderStore()

