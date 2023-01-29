export default function utils (Target: any) {
	Target.prototype.plus = function (a: number, b: number) { //🐯🐯在目标对象的原型上增加一个 plus 方法
		return a + b;
	}

	Target.prototype.minus = function (a: number, b: number) { //🐯🐯在目标对象的原型上增加一个 plus 方法
		return a + b;
	}

	Target.prototype.name = 'Zeno'
}