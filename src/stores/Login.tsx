import {observable, makeObservable} from 'mobx'

class HomeStore{
  constructor(){
    makeObservable(this)
  }
  @observable pageName = '登录页'
}

export default HomeStore

