const root: HTMLElement = document.getElementById('root')

function add(n1: number, n2: number, isPrint: boolean): number {
	if (isPrint) console.log(n1, n2)
	return n1 + n2
}

const number1 = 9
const number2 = 2.8
const isPrint: boolean = true

const r = add(number1, number2, isPrint)

root.textContent = r.toString()
