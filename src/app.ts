import TodoList from './TodoList/index'

// Controller 层
((doc) => {  //document 对象被传递给了 doc 参数，并 doc 作为参数传递给了匿名函数
	const oInput: HTMLInputElement = doc.querySelector('input') as HTMLInputElement
	const oAddBtn: HTMLButtonElement = doc.querySelector('.add-btn') as HTMLButtonElement
	const oTodoList: HTMLElement = doc.querySelector('.todo-list') as HTMLElement
	// 实例化
	const todoList = TodoList.create(oTodoList) //create 创建一个实例
	// '/' 加上 '*' 号可以打出下面的注释
	/**
	 * addItem(todo) {id: new Date().getTime, content: oInput.value, completed: falser} 三个参数
	 * removeItem(id)  todoData -> 拿到 id -> 找到对应的 item list -> 删除
	 * toggleComplete(id) -> 拿到 id -> 找到对应的 item list -> 改变状态
	 */


	// 每个模块都需要有个 init 函数 (类似模块的开关)
	const init = (): void => {
		bind()
	}

	// 用来管理所有事件对象的绑定
	function bind() {
		oAddBtn.addEventListener('click', onAddBtnClick, false) //一般写做 onXXX、handleXXX
		oTodoList.addEventListener('click', onTodoListClick, false)
	}


	// 事件处理函数
	function onAddBtnClick() {
		// console.log('触发了事件监听器...');
		const val: string = oInput.value.trim()//去掉空格
		if(!val.length) {//为空没有输入的状态, 则为 0, 那么则为 false
			return
		}

		todoList.addItem({ //执行 addItem 函数, 添加一个 item
			id: new Date().getTime(),
			content: val,
			completed: false
		})

		// 清空输入框
		oInput.value = ''
		// console.log(oTodoList);
	}


	// 🔥事件处理函数 (绑定整个 list 的【🔥 事件代理（包含切换 checkbox、删除 item 两个事件）】 用 e 来找到真正点击的是 checkbox 还是 button！】, 用来代理所有的 checkbox)
	function onTodoListClick(e: MouseEvent) {//可能是【鼠标的点击】也可能是【键盘的点击】
		const tar = e.target as HTMLElement //🔥因为 HTMLElement 上才有 tagName 属性
		const tagName = tar!.tagName.toLocaleLowerCase() //BUTTON 转化为小写 Button
		// console.log(tagName);//大小写问题！！
		// console.log(oTodoList);

		if(tagName === 'input' || tagName === 'button') { //不用当心 button 会重复, 因为事件是绑定在 oTodoList 上的
			const id: number = parseInt(tar.dataset.id!)

			// console.log('开始执行切换或绑定的事件...')
			switch (tagName) {
				case 'input':
					todoList.toggleComplete(id)
					break
				case 'button':
					todoList.removeItem(id)
					break
				default:
					break
				
			}
		}
	}

	init()
	
})(document)