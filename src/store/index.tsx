import {
  observable,
  action,
  computed
} from 'mobx'

class AppStore {
  @observable time = '2021年'
  @observable todos:string[] = []
  // 当所监听数据发生变化时,computed会重新执行
  @computed get desc() {
      return `${this.time} 还有${this.todos.length}条任务待完成`
  }
  @action addTodo(todo:string) {
      this.todos.push(todo)
  }
}

const store = new AppStore()

export default store