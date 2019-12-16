function convertHTML(str: string) {
	// &colon;&rpar;
	const replace: { [key: string]: string } = {
		['&']: '&amp;',
		['<']: '&lt;',
		['>']: '&gt;',
		['"']: '&quot;',
		["'"]: '&apos;'
	}
	const check = /[&<>"']/g
	return str.replace(check, char => replace[char])
}

console.log(convertHTML('Dolce & Gabbana'))
