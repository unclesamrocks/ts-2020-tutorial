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

console.log('update')
