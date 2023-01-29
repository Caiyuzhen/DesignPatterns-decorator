# TodoList 的设计
## 数据的操作
	- 用哪些方法 -> 操作数据 todoData[]
     - 增加数据 -> addTodo(todo)  {id, content, completed}
     - 删除数据 -> 找到 {id} -> 传入 deleteTodo(id) 方法 -> todoData -> remove[id]
     - 改变状态 -> 找到 {id} -> 传入 changeComplete(id)方法 -> todoData -> checked ? XXX : XXX

## DOM 的操作
	- 用哪些方法 -> 操作 DOM -> oTodoList
	 - 增加项 -> 需要一个 todo 模板 -> 创造一个 todoItem -> 增加到 oTodoList 内
	 - 删除项 -> 找到 {id} -> 传入 todoItem{id} 方法 -> remove[id]
	 - 改变状态 -> 找到 id -> 传入 todoItem{id} 方法 -> comtent ? XXX : XXX


## 设计方式(过往外观模式下)
    DOM 操作 
      -> 数据操作
	     -> app.ts
		 	-> 执行数据操作的方法

## 设计方式(装饰器模式下)
    DOM 操作 @装饰器（数据操作挂载到 DOM 操作上）
	  -> app.ts
		 	-> 执行 DOM 操作的方法

## 装饰器的本质
- 对功能的增强