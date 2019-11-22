const root = document.getElementById('root')
const pre = document.createElement('pre')

function add(n1: number, n2: number) {
	return n1 + n2
}

function printResult(num: number): void {
	console.log(`The resut of something: ${num}`)
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
	const r = n1 + n2
	cb(r)
}

pre.textContent = JSON.stringify({}, null, 4)
root.appendChild(pre)

/*==============================================
                Function type
===============================================*/

let combinedValues: (a: number, b: number) => number
combinedValues = add

addAndHandle(2, 3, num => console.log('Callback:', num))

const makeError = (msg: string, code: number): never => {
	throw { msg: msg, errorCode: code }
	// "never" never returns a value
}
