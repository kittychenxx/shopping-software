import {
  observable,
  action,
  computed,
  runInAction,
  makeObservable
} from 'mobx'

class AppStore {
  // 构造函数使用makeObservable使这个store可以被监控
  constructor(){
    makeObservable(this)
  }
  // 声明一个可以被监控的属性
  @observable time = '2021年'
  @observable name = 'hahahaha'
  @observable todos: string[] = []
  // 当所监听数据发生变化时,computed会重新执行
  @computed get desc() {
    return `${this.time} 还有${this.todos.length}条任务待完成`
  }
  @action addTodo(todo: string) {
    // this.todos.push(todo)
    console.log(this)
  }
  // @action.bound 可以保证this永远是当前实例(推荐使用)
  @action.bound
  unbound(){
    console.log(this)
  }
  // 异步操作
  // 严格模式下mobx的state必须用action修改,如果action中有异步操作需要用runInAction来修改state
  @action.bound
  fn = () => {
    setTimeout(()=>{
      runInAction(()=>{
        this.name = 'maxiqi'
        this.time = '2029年'
        console.log(this);      
      })
    }, 2000)
  }
}

// store可以导出类,也可以new成实例后导出
export default AppStore