import {
  action,
  computed,
  runInAction
} from 'mobx'
import CountStore, {ICountType} from './count'

export interface ICountChangeType extends ICountType{
  addFive(): void
  minusFive(): void
  twoCount: number
} 

class CountPlusStore extends CountStore {
  @action.bound
  addFive(){
    setTimeout(()=>{
      runInAction(()=>{
        this.count = this.count + 5
      })
    }, 2000)
  }
  @action.bound
  minusFive(){
    this.count = this.count - 5
  }
  @computed get twoCount(){
    return this.count * 2
  }
}

export default CountPlusStore