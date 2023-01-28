import { addTodoData, changeTodoCompletedData, removeTodoData } from "./TodoEvent"
import { todoView } from "./template"


export interface ITodo {
	id: number
	content: string
	completed: boolean
}


// Todo 数据
const todoData: ITodo[] = []


// View 层
class TodoList {
	private oTodoList: HTMLElement
	private static instance: TodoList

	constructor(oTodoList: HTMLElement) {//判断是否已有单例
		this.oTodoList = oTodoList
	}

	// 创建单例
	public static create(oTodoList: HTMLElement) {
		if(!TodoList.instance) { //如果 instance 不存在
			TodoList.instance = new TodoList(oTodoList)
		}

		return TodoList.instance //如果存在那就直接返回之前的那个 instance 实例, 不存在就 new 之后再 return
	}


	// 添加 todo DOM
	@addTodoData(todoData) //装饰器挂载到 DOM 的过程中, 然后 addTodo 会把 todo: ITodo 给进行传入到 todoData
	public addItem(todo: ITodo) { //todo 的接口
		console.log('构建 view 中...');
		const oItem: HTMLElement = document.createElement('div')
		oItem.className = 'todo-item'
		oItem.innerHTML = todoView(todo)
		this.oTodoList.appendChild(oItem) //🔥最终把 item 装填回 oTodoList 内
	}


	// 删除 todo DOM
	@removeTodoData(todoData) //装饰器挂载到 DOM 的过程中, 会根据下面 的id 去修改 todoData 的数据
	public removeItem(id: number) {
		console.log('删除视图中...');
		const oItems: HTMLCollection = document.getElementsByClassName('todo-item') //取出所有 item

		Array.from(oItems).forEach((oItem) => { //🔥取出每条 item , Array 先转为数组再遍历
			const _id = parseInt(oItem.querySelector('button')!.dataset.id!)//找到点击的那个 item 上的【 button 身上绑定的 id 】, 然后转为数字类型
			if (_id === id) {
				oItem.remove() //移除掉匹配到的这条
			}
		})
	}

	
	// 修改 checkbox DOM
	@changeTodoCompletedData(todoData) //挂载到 DOM 的过程中, 会传入 id 去更改 cpmpleted 的状态, 然后会返回一个函数, 再去执行下面的 const oItems... 等函数
	public toggleComplete(id: number, completed: boolean) { //🔥🔥🔥completed 应该是在点击 checckbox 时候, 拦截一下数据, 获取 completed 的状态然后传入的
		const oItems: HTMLCollection = document.getElementsByClassName('todo-item')

		Array.from(oItems).forEach((oItem) => {
			const _id = parseInt(oItem.querySelector('input')!.dataset.id!)
			if (_id === id) {
				const oContent = oItem.querySelector('span')
				oContent!.style.textDecoration = completed ? 'line-through' : 'none'
			}
		})
	}

}



export default TodoList
