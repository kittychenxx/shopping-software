import CountPlusStore, {ICountChangeType} from '../models/Home/countPlus'
import ColorStore, {IColorType} from '../models/Home/color'
import {observable,makeObservable} from 'mobx'

export interface IHomeType{
  pageName: string
  countCompute: ICountChangeType
  colorChange: IColorType
}

let countPlusStore = new CountPlusStore()
let colorStore = new ColorStore()

class HomeStore{
  constructor(){
    makeObservable(this)
  }
  // mobx做store合并的时候store对应的属性名不用被@observable修饰
  countCompute = countPlusStore
  colorChange = colorStore
  @observable pageName = 'Home页'
}

export default HomeStore

