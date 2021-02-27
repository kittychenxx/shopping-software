import {
  observable,
  makeObservable,
  action
} from 'mobx'

export interface ICountType{
  count: number
  add(): void
  minus(): void
}

class CountStore {
  constructor(){
    makeObservable(this)
  }
  @observable count = 100
  @action.bound
  add(){
    this.count++
  }
  @action.bound
  minus(){
    this.count--
  }
}

export default CountStore