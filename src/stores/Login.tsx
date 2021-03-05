import {
  observable,
  makeObservable,
  action
} from 'mobx'

export interface IUserInfoType{
  email: string
  password: string
  changeEmail: (email: string)=>void
}

class LoginStore {
  constructor(){
    makeObservable(this)
  }
  @observable email = ''
  @observable password = ''
  
  @action.bound
  changeEmail(email: string){
    this.email = email
  }
}

export default new LoginStore()

