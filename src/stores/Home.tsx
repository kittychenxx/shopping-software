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
  @observable countCompute = countPlusStore
  @observable colorChange = colorStore
  @observable pageName = 'Home页'
}

export default HomeStore

