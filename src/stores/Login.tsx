import {
  observable,
  makeObservable,
} from 'mobx'

export interface IUserInfoType{
  email: string
  password: string
}

class LoginStore {
  constructor(){
    makeObservable(this)
  }
  @observable username = ''
  @observable password = ''
}

export default LoginStore

