import { ITodo } from './index'

// 用装饰器实现【 Module 层】的数据修改, 🔥🔥记住都是 todoData 的数据修改！！
export function addTodoData(todoData: ITodo[]) {
	return function ( //返回一个装饰器函数
		target: any, //当前【装饰的函数】所挂载的【容器】 -> TodoList.prototype, 类型定义一般是 any
		methods: string, //【被装饰的函数】的【名称】
		description: PropertyDescriptor //【描述器】, 描述这个方法的属性
	) {
		const _origin = description.value //🔥🔥🔥其实就是拿到了 index 内的 addItem 函数, 保存一下

		description.value = function (todo: ITodo) {  //🔥🔥重写addItem 函数, todo 为原来 addItem 的参数, 👀然后拿来跟 todoData 的数据进行比对, 【👋👋👋进行了拦截, 在这里先执行了数据层的操作!!然后再执行视图层的操作!!】
			// console.log(todo)

			// 🌟执行数据层操作, 重新赋值给 todoData
			const _todo: ITodo | undefined = todoData.find((t: ITodo) => t.content === todo.content) //找出相同的 todo, 判断 todoData 中是不是已经有了这个 todo 了

			if(_todo) //如果 todoData 中已存在了这个 todo, 就不再添加
				alert('已经存在了这个 todo 了')
			else {
				todoData.push(todo) //重新赋值给 todoData

				// 🌟DOM 操作, 本质是执行了 index 里边的 addItem 函数!
				_origin.call(this, todo) //⚡️⚡️重置 this 指向到 TodoList 的实例, 不然会报错 undefined!! 🔥🔥用 call 来修正指向!!
				// console.log(todoData);
			}
		}
		// console.log(target) 
		//装饰器挂载在 class 的原型 （constructor) 上 
		// console.log(methods) //被装饰的对象 // console.log(description) //描述器, 里边的 value 就是被装饰的函数(也就是 addItem 本身, 然后就可以重写它)
	} 
}



export function removeTodoData(todoData: ITodo[]) {
	return function ( //返回一个装饰器函数
	target: any, //当前【装饰的函数】的【容器】 -> TodoList.prototype, 类型一般是 any
	methods: string, //【被装饰的函数】的【名称】
	description: PropertyDescriptor //【描述器】, 描述这个方法的属性
	) {
		const _origin = description.value //🔥🔥🔥其实就是拿到了 index 内的 removeItem 函数, 保存一下, 【👋👋👋进行了拦截, 在这里先执行了数据层的操作!!然后再执行视图层的操作!!】

		description.value = function (_id: number) {// 🔥🔥重写 removeItem 函数, _id 为原来 removeItem 的参数, 👀然后拿来跟 todoData 的数据进行比对

			// 🌟执行数据层操作, 重新赋值给 todoData
			todoData = todoData.filter((todo: ITodo) => todo.id !== _id) //过滤掉选中的 id

			_origin.call(this, _id) //⚡️⚡️重置 this 指向到 TodoList 的实例, 不然会报错 undefined!!
			console.log(todoData);
		}
	} 
}



export function changeTodoCompletedData(todoData: ITodo[]) {
	return function ( //返回一个装饰器函数
	target: any, //当前【装饰的函数】的【容器】 -> TodoList.prototype, 类型一般是 any
	methods: string, //【被装饰的函数】的【名称】
	description: PropertyDescriptor //【描述器】, 描述这个方法的属性
	) {
		//🔥🔥🔥其实就是拿到了 index 内的 toggleComplete 函数, 保存一下, 【👋👋👋进行了拦截, 在这里先执行了数据层的操作!!然后再执行视图层的操作!!】
		const _origin = description.value

		// 🔥🔥重写 toggleComplete 函数, _id 为原来 toggleComplete 的参数, 👀然后拿来跟 todoData 的数据进行比对
		description.value = function (_id: number) {
			todoData = todoData.map((todo: ITodo) => {
				if(todo.id === _id) {
					todo.completed = !todo.completed  //改变 todo.completed 的值
					_origin.call(this, _id, todo.completed)	//⚡️⚡️这里要传入两个属性, 来重置 this 指向到 TodoList 的实例,
				}
				return todo //Map 是没有 return 全部 todo 的, 所以要手动 return！
			})
		}
	} 
}