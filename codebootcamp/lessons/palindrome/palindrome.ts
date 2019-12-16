function palindrome(str: string) {
	const clean = str.replace(/[^a-z0-9]/gi, '').toLowerCase()
	for (let i = 0, k = clean.length - 1; i < clean.length; i++, k--) {
		if (i === k) break
		if (clean[i] !== clean[k]) return false
	}
	// Good luck!
	return true
}

console.log(palindrome('eye'))
console.log(palindrome('_eye'))
console.log(palindrome('A man, a plan, a canal. Panama'))
console.log(palindrome('1 eye for of 1 eye.'))
console.log(palindrome('My age is 0, 0 si ega ym.'))
