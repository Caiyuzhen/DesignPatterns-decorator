import { todoView } from "./template"


export interface ITodo {
	id: number
	content: string
	completed: boolean
}


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
	public addItem(todo: ITodo) { //todo 的接口
		console.log('构建 view 中...');
		const oItem: HTMLElement = document.createElement('div')
		oItem.className = 'todo-item'
		oItem.innerHTML = todoView(todo)
		this.oTodoList.appendChild(oItem) //🔥最终把 item 装填回 oTodoList 内
	}

	// 删除 todo DOM
	public removeItem(id: number) {
		console.log('删除视图中...');
		const oItems: HTMLCollection = document.getElementsByClassName('todo-item') //取出所有 item

		Array.from(oItems).forEach((oItem) => { //🔥取出每条 item , Array 先转为数组再遍历
			const _id = parseInt(oItem.querySelector('button')!.dataset.id!)//取得点击的那个 item 上的 button, 然后转为数字类型
			if (_id === id) {
				oItem.remove() //移除掉匹配到的这条
			}
		})
	}

	// 修改 checkbox DOM
	public toggleComplete(id: number) {

	}

}



export default TodoList
