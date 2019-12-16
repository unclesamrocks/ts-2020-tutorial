function fearNotLetter(str: string): string | undefined {
	let missingLetter: string | undefined
	const letters = 'abcdefghijklmnopqrstuvwxyz'
	let strIndex = 0
	for (let i = letters.indexOf(str.charAt(0)); i < letters.indexOf(str.charAt(str.length - 1)); i++) {
		if (!missingLetter && letters[i] !== str[strIndex]) {
			missingLetter = letters[i]
			break
		}
		strIndex++
	}
	return missingLetter
}

console.log(fearNotLetter('abce'))
console.log(fearNotLetter('stvwx')) // should return "u".
console.log(fearNotLetter('bcdf')) // should return "e".
