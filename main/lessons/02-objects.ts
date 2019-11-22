const root: HTMLElement = document.getElementById('root')
const pre: HTMLElement = document.createElement('pre')

const person = {
	name: 'Nikita',
	age: 32,
	hobbies: ['sports', 'computers']
}

pre.textContent = JSON.stringify(person, null, 4)
root.appendChild(pre)
