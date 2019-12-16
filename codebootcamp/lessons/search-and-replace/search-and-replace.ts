function myReplace(str: string, before: string, after: string): string {
	if (before.charAt(0) === before.charAt(0).toUpperCase()) {
		after = after.charAt(0).toUpperCase() + after.slice(1)
	}
	return str.replace(before, after)
}

console.log(myReplace('A quick brown fox jumped over the lazy dog', 'jumped', 'leaped'))
// should return "He is Sitting on the couch".
console.log(myReplace('He is Sleeping on the couch', 'Sleeping', 'sitting'))
