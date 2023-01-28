import { ITodo } from './index'

// 用装饰器实现【 Module 层】的数据修改
export function addTodoData(todoData: ITodo[]) {
	return function ( //返回一个装饰器函数
		target: any, //当前【装饰的函数】所挂载的【容器】 -> TodoList.prototype, 类型定义一般是 any
		methods: string, //【被装饰的函数】的【名称】
		description: PropertyDescriptor //【描述器】, 描述这个方法的属性
	) {
		// console.log(target) //装饰器挂载在 class 的原型 （constructor) 上
		// console.log(methods) //被装饰的对象
		// console.log(description) //描述器, 里边的 value 就是被装饰的函数(也就是 addItem 本身, 然后就可以重写它)
		const _origin = description.value //其实就是拿到了 addItem 函数

		description.value = function (todo: ITodo) { //todo 为原来 addItem 的参数
			// console.log(todo)
			// 🌟执行数据操作
			const _todo: ITodo | undefined = todoData.find((t: ITodo) => t.content === todo.content) //找出相同的 todo, 判断 todoData 中是不是已经有了这个 todo 了

			if(_todo) //如果 todoData 中已存在了这个 todo, 就不再添加
				alert('已经存在了这个 todo 了')
			else {
				todoData.push(todo)
				// 🌟DOM 操作, 本质是执行了 index 里边的 addItem 函数!
				_origin.call(this, todo) //this 指向是 TodoList 的实例, 不然会报错 undefined!! 🔥🔥用 call 来修正指向!!
				console.log(todoData);
			}
		}
	} 
}


export function removeTodoData(todoData: ITodo[]) {
	return function ( //返回一个装饰器函数
	target: any, //当前【装饰的函数】的【容器】 -> TodoList.prototype, 类型一般是 any
	methods: string, //【被装饰的函数】的【名称】
	description: PropertyDescriptor //【描述器】, 描述这个方法的属性
	) {
		
	} 
}


export function changeTodoCompletedData(todoData: ITodo[]) {
	return function ( //返回一个装饰器函数
	target: any, //当前【装饰的函数】的【容器】 -> TodoList.prototype, 类型一般是 any
	methods: string, //【被装饰的函数】的【名称】
	description: PropertyDescriptor //【描述器】, 描述这个方法的属性
	) {
		const _id: string = 
	} 
}