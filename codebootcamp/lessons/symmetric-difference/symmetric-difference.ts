function sym<T>(...args: T[][]): T[] {
	return [...new Set(args.reduce((acc, curr) => curr.filter(el => !acc.some(elem => elem === el)).concat(acc.filter(el => !curr.some(elem => elem === el))), []))].sort((a, b) =>
		a > b ? 1 : a === b ? 0 : -1
	)
}

console.log(sym([1, 2, 3, 3], [5, 2, 1, 4])) // should return [3, 4, 5]
console.log(sym([1, 2, 3], [5, 2, 1, 4])) // should return [3, 4, 5]
console.log(sym([1, 2, 3], [5, 2, 1, 4, 5])) // should return [3, 4, 5]
console.log(sym([1, 2, 5], [2, 3, 5], [3, 4, 5])) // should return [1, 4, 5]
console.log(sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3])) // should return [2, 3, 4, 6, 7]
