type ReturnFunc = (n: number) => number | undefined

function addTogether(n: number): ReturnFunc
function addTogether(n: any, ...args: any[]): undefined

function addTogether(n: number, ...args: number[]) {
	if (args.length) {
		if (args.every(num => typeof num === 'number')) {
			return n + args.reduce((acc, curr) => acc + curr)
		} else {
			// undefined & args
			return undefined
		}
	} else {
		if (typeof n === 'number') {
			return function(k: number): number | undefined {
				if (typeof k !== 'number') return undefined
				return n + k
			}
		} else {
			return undefined
		}
	}
}

console.log(addTogether(2, 3))
console.log(addTogether(2)(3))
console.log(addTogether('http://bit.ly/IqT6zt'))
console.log(addTogether(2)([3]))
