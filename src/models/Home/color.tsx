import {
  observable,
  makeObservable,
  action
} from 'mobx'

export interface IColorType{
  color: string
  changeYellow():void
  changeRed():void
}

class ColorStore {
  constructor(){
    makeObservable(this)
  }
  @observable color = 'red'
  @action.bound
  changeYellow(){
    this.color = 'yellow'
  }
  @action.bound
  changeRed(){
    this.color = 'red'
  }
}

export default ColorStore