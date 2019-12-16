function rot13(str: string): string {
	// LBH QVQ VG!
	const getLetter = (letter: string, offset: number): string => {
		const alphabet = 'abcdefghijklmnopqrstuvwxyz'
		let indexOf = alphabet.indexOf(letter.toLowerCase())
		if (indexOf + offset > alphabet.length - 1) indexOf = indexOf - offset
		else indexOf = indexOf + offset
		return alphabet[indexOf]
	}
	// ROT13
	return str
		.split('')
		.map(letter => {
			if (/[^a-z]/i.test(letter)) return letter
			return getLetter(letter, 13)
		})
		.join('')
		.toUpperCase()
}

// Change the inputs below to test
console.log(rot13('SERR PBQR PNZC'))
console.log(rot13('SERR CVMMN!'))
console.log(rot13('SERR YBIR?'))
console.log(rot13('GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.'))
