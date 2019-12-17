function bubbleSort(array: number[]) {
	// change code below this line
	let r = [] as number[]
	for (let i = 0; i < array.length; i++) {
		const num = array[i]
		if (!r.length) r.push(num)
		else {
			const indexOf = r.findIndex(n => num < n)
			if (indexOf === -1) r.push(num)
			else {
				r = r.slice(0, indexOf).concat(num, r.slice(indexOf))
			}
		}
	}
	return r
	// change code above this line
}

console.log(bubbleSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]))
