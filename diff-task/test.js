Number.prototype.__proto__ = new Proxy(Number, {
	get(target, handler) {
		console.log(handler)
		console.log(target)
		return target.length
	}
})

console.log(5)
console.log(6)
/**
 *
 * 5[x=>x+1] // [6,5,4,3,2]
 * 2[x=>x] // [2,1]
 *
 */
