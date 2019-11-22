const root: HTMLElement = document.getElementById('root')
const pre: HTMLElement = document.createElement('pre')

type Combinable = number | string
type ResultTypes = 'as-text' | 'as-number'

function combine(n1: Combinable, n2: Combinable, resultType?: ResultTypes) {
	if (typeof n1 === 'number' && typeof n2 === 'number') {
		return resultType === 'as-text' ? `${n1 + n2}` : n1 + n2
	} else {
		return resultType === 'as-text' ? n1.toString() + n2.toString() : +(n1.toString() + n2.toString())
	}
}

pre.textContent = JSON.stringify(combine(2, 3, 'as-text'), null, 4)
root.appendChild(pre)
