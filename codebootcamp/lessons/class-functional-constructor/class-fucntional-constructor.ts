interface Person {
	getFullName: () => string
	getFirstName: () => string
	getLastName: () => string
	setFullName: (name: string) => void
	setFirstName: (name: string) => void
	setLastName: (name: string) => void
}

var Person = (function(this: Person, firstAndLast: string) {
	let firstName = firstAndLast.split(' ')[0]
	let lastName = firstAndLast.split(' ')[1]
	// Complete the method below and implement the others similarly
	this.getFullName = function() {
		return firstName + ' ' + lastName
	}
	this.getFirstName = () => firstName
	this.getLastName = () => lastName
	this.setFirstName = name => (firstName = name)
	this.setLastName = name => (lastName = name)
	this.setFullName = name => {
		firstName = name.split(' ')[0]
		lastName = name.split(' ')[1]
	}
} as any) as { new (firstAndLast: string): Person }

var bob = new Person('Bob Ross')
console.log(bob.getFullName())
console.log(bob instanceof Person)
console.log(bob.firstName)
