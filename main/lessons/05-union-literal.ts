const root: HTMLElement = document.getElementById('root')
const pre: HTMLElement = document.createElement('pre')

function combine(n1: number | string, n2: number | string, resultType?: 'as-text' | 'as-number') {
	if (typeof n1 === 'number' && typeof n2 === 'number') {
		return resultType === 'as-text' ? `${n1 + n2}` : n1 + n2
	} else {
		return resultType === 'as-text' ? n1.toString() + n2.toString() : +(n1.toString() + n2.toString())
	}
}

pre.textContent = JSON.stringify(combine(2, 3, 'as-number'), null, 4)
root.appendChild(pre)
