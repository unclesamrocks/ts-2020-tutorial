class SetList {
	// the var collection will hold the set
	constructor(protected collection: any[] = []) {}
	// this method will check for the presence of an element and return true or false
	has(element: any) {
		return this.collection.indexOf(element) !== -1
	}
	// this method will return all the values in the set
	values() {
		return this.collection
	}
	// this method will add an element to the set
	add(element: any) {
		if (!this.has(element)) {
			this.collection.push(element)
			return true
		}
		return false
	}
	// this method will remove an element from a set
	remove(element: any) {
		if (this.has(element)) {
			var index = this.collection.indexOf(element)
			this.collection.splice(index, 1)
			return true
		}
		return false
	}
	// this method will return the size of the set
	size() {
		return this.collection.length
	}
	// change code below this line
	union(second: SetList) {
		const setList = second.values()
		const newSet = Object.keys(
			this.collection.concat(setList).reduce((acc, curr) => {
				acc[curr] = null
				return acc
			}, {})
		)
		return newSet
	}

	unionAlt(second: SetList) {
		const set = new SetList()
		this.values().forEach(v => set.add(v))
		second.values().forEach(v => set.add(v))
		return set
	}

	unionAltTwo(second: SetList) {
		second.values().forEach(v => this.add(v))
		return this
	}
	// change code above this line
}

const setA = new SetList()
setA.add('a')
setA.add('b')
setA.add('c')

const setB = new SetList()
setB.add('a')
setB.add('b')
setB.add('d')
setB.add('e')

const setC = new SetList()
setC.add('c')
setC.add('d')

console.log(setA.union(setB))
console.log(setA.unionAltTwo(setC))
