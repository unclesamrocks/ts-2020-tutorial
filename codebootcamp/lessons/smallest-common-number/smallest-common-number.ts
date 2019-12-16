function smallestCommons(arr: [number, number]): number {
	const sortedArr = arr.sort((a, b) => a - b)
	const numRange = []
	let smallestCommonNum = 1
	for (let i = sortedArr[0]; i <= sortedArr[1]; i++) {
		numRange.push(i)
	}
	while (!numRange.every(num => !(smallestCommonNum % num))) {
		smallestCommonNum++
	}
	console.log(numRange)
	return smallestCommonNum
}

console.log(smallestCommons([1, 5]))
