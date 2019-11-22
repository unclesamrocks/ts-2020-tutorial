const root: HTMLElement = document.getElementById('root')

function add(n1: number, n2: number, isPrint?: boolean, resPhrase?: string): number {
	if (isPrint && resPhrase) console.log(resPhrase, n1 + n2)
	return n1 + n2
}

const number1 = 9
const number2 = 2.8
const isPrint = true
const resPhrase = 'Result of calc is: '

const r = add(number1, number2, isPrint, resPhrase)

root.textContent = r.toString()
