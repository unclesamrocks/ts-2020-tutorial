const root: HTMLElement = document.getElementById('root')

function add(n1: number, n2: number): number {
	return n1 + n2
}

const number1 = 6
const number2 = 2.8

const r = add(number1, number2)

root.textContent = r.toString()
