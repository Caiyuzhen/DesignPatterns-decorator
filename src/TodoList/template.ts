import { ITodo } from "./index";


export function todoView( { id, content, completed }: ITodo ) : string { //返回的视图层 View, 模板字符串
	return `
		<input type="checkbox" id="${ id }" ${ completed ? 'checked ': '' } data-id="${ id }"/>
		<span style="text-decoration: ${ completed ?  'line-through' : 'none'}">${ content }</span>
		<button data-id="${ id }">删除</button>
	`
}