/**
    Translate the provided string to pig latin.

    Pig Latin takes the first consonant (or consonant cluster) of an English word, moves it to the end of the word and suffixes an "ay".

    If a word begins with a vowel you just add "way" to the end.

    If a word does not contain a vowel, just add "ay" to the end.

    Input strings are guaranteed to be English words in all lowercase.

    Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.
*/

const translatePigLatin = (str: string): string => {
	const vovels = /[aeiuo]/gi
	const consonant = /^[bcdfghjklmnpqrstvxzwy]+/i
	if (vovels.test(str.charAt(0))) return str + 'way'
	if (!vovels.test(str)) return str + 'ay'
	// consonants
	const wordStartChars = str.match(consonant)
	if (wordStartChars) return str.replace(consonant, '') + wordStartChars[0] + 'ay'
	// error case
	else return str
}

// tests
console.log(translatePigLatin('california')) // should return "aliforniacay".
console.log(translatePigLatin('paragraphs')) // should return "aragraphspay".
console.log(translatePigLatin('glove')) // should return "oveglay".
console.log(translatePigLatin('algorithm')) // should return "algorithmway".
console.log(translatePigLatin('eight')) // should return "eightway".
// Should handle words where the first vowel comes in the middle of the word. translatePigLatin("schwartz") should return "artzschway".
console.log(translatePigLatin('schwartz')) // should return "artzschway".
// Should handle words without vowels.
console.log(translatePigLatin('rhythm')) // should return "rhythmay".
