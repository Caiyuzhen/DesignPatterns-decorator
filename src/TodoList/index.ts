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


	// 添加
	public addItem(todo: ITodo) {

	}

	// 删除
	public removeItem(id: number) {

	}

	// 修改 checkbox
	public toggleComplete(id: number) {

	}

}



export default TodoList
