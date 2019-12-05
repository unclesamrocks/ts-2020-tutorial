const root = document.getElementById('root')
const pre = document.createElement('pre')

// pre.textContent = JSON.stringify({ a: 'huy', b: { c: 'asd' } }, null, 4)
// root.appendChild(pre)

const button = document.querySelector('button')

if (button) {
	button.addEventListener('click', () => {
		console.log('happened here!!')
	})
}

type One = string | number
type Two = number | boolean
type Combo = One & Two
const a: Combo = 2

console.log('update')

/*==============================================
				here
===============================================*/

const Bfff = Object.create(null)

console.log(Bfff)

Bfff.go = () => console.log('gg wp')

Bfff.go()

if ('go' in Bfff) console.log('exist')
else console.log('not exist')

console.log(Object.prototype.hasOwnProperty.call(Bfff, 'go'))

/*==============================================
				as
===============================================*/

const inputEl = document.getElementById('someInputElement') as HTMLInputElement

// alternative! ))
if (inputEl) {
	;(inputEl as HTMLInputElement).value = 'Hi!'
}
