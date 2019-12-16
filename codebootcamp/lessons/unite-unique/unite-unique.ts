function uniteUnique<T>(...args: Array<T[]>): T[] {
	return [...new Set(args.reduce((acc, curr) => acc.concat(curr), []))]
}

console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]))
