const root: HTMLElement = document.getElementById('root')
const pre: HTMLElement = document.createElement('pre')

const person = {
	name: 'Nikita',
	age: 32,
	hobbies: ['sports', 'computers'],
	role: <[number, string]>[2, 'author']
}

person.role.push('new')
person.role[3] = 'newRole'

pre.textContent = JSON.stringify(person, null, 4)
root.appendChild(pre)
