import {
  action,
  computed
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
    this.count = this.count + 5
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