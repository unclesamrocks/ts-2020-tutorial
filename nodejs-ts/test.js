function test() {
	let i = 1
	let g = 'astr'
	return function(name) {
		this.counter = () => i++
		this.str = g
		this.change = str => (this.str = str)
		console.log('[i]', i, '[name]', name)
		return this
	}
}

const ggg = test()('ggg')

console.log(ggg.counter())
console.log(ggg.counter())
console.log(ggg.counter())

console.log(ggg.str + ' new stuff')
ggg.change('completely new stuff')
console.log(ggg.str)

const fff = test()('fff')
console.log(fff.counter())
