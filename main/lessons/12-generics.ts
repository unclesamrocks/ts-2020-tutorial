/*==============================================
		Generics with optional contrains
===============================================*/

function merge<T extends object, K extends object>(objA: T, objB: K) {
	return Object.assign(objA, objB)
}

const merged = merge({ name: 'Nikita' }, { age: 30 })

console.log(merged)

/*==============================================
			Checks for property
===============================================*/

interface Lengthy {
	length: number
}

function countAndPrint<T extends Lengthy>(el: T): [T, string] {
	let desc = 'Got no value'
	if (el.length > 0) desc = `Element length: ${el.length}`
	return [el, desc]
}

console.log(countAndPrint(['String', 'second string']))

/*==============================================
			Returns key of passed obj
===============================================*/

const extractAndConvert = <T extends object, U extends keyof T>(obj: T, key: U): T[U] => {
	return obj[key]
}

const keyValue = extractAndConvert({ name: 'Nikita', age: 32 }, 'age')

console.log(keyValue)

/*==============================================
				Class generics
===============================================*/

class DataStorage<T> {
	private data: T[] = []

	addItem(item: T) {
		this.data.push(item)
	}

	removeItem(item: T) {
		this.data.splice(this.data.indexOf(item), 1)
	}

	getItems() {
		return [...this.data]
	}
}

const textStorage = new DataStorage<string>()

textStorage.addItem('Nikita')
textStorage.addItem('Sam')
textStorage.addItem('Test')
textStorage.removeItem('Test')
console.log(textStorage.getItems())

const numStorage = new DataStorage<number>()

numStorage.addItem(1)
numStorage.addItem(2)
numStorage.addItem(3)
numStorage.removeItem(2)
console.log(numStorage.getItems())

const objectStorage = new DataStorage<object>()

const testObj = { name: 'Test' }

objectStorage.addItem({ name: 'Nikita' })
objectStorage.addItem({ name: 'Sam' })
objectStorage.addItem(testObj)
objectStorage.removeItem(testObj)
console.log(objectStorage.getItems())
