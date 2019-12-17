function pairwise(arr: number[], arg: number): number {
	type IndexValue = { index: number; value: number }
	// prep
	const pairs = [] as [IndexValue, IndexValue][]
	// data loop
	arr.forEach((numOne, indexOne, array) => {
		array.forEach((numTwo, indexTwo) => {
			if (indexOne !== indexTwo && numOne + numTwo === arg) {
				if (!pairs.length) {
					// initial push
					pairs.push([
						{ index: indexOne, value: numOne },
						{ index: indexTwo, value: numTwo }
					])
				} else {
					// CASES
					// check for pair with presented indexes already in the pairs list
					const indexOfPrevPair = pairs.findIndex(pair => {
						// check for match && mirror case.
						return pair.some(pairArr => pairArr.index === indexOne || pairArr.index === indexTwo)
					})
					if (indexOfPrevPair === -1) {
						// if no index => another push
						pairs.push([
							{ index: indexOne, value: numOne },
							{ index: indexTwo, value: numTwo }
						])
					}
				}
			}
		})
	})
	// check
	console.log(pairs)
	// calc result
	let result = pairs.reduce((prev, next) => {
		return prev + next.reduce((acc, curr) => acc + curr.index, 0)
	}, 0)
	// return
	return result
}

console.log(pairwise([1, 4, 2, 3, 0, 5], 7)) // 11
console.log(pairwise([7, 9, 11, 13, 15], 20)) // 6
console.log(pairwise([1, 1, 1], 2)) // 1
console.log(pairwise([0, 0, 0, 0, 1, 1], 1)) // 10
