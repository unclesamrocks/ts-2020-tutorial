const root: HTMLElement = document.getElementById('root')
const pre: HTMLElement = document.createElement('pre')

enum Roles {
	AUTHOR = 1, // can be assigned on first element, then next will be ++
	ADMIN,
	READ_ONLY
}

const person = {
	name: 'Nikita',
	age: 32,
	hobbies: ['sports', 'computers'],
	role: Roles.AUTHOR
}

pre.textContent = JSON.stringify(person, null, 4)
root.appendChild(pre)
