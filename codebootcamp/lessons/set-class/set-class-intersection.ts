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
	// this method will return the union of two sets
	union(otherSet: SetList) {
		var unionSet = new Set()
		var firstSet = this.values()
		var secondSet = otherSet.values()
		firstSet.forEach(function(e) {
			unionSet.add(e)
		})
		secondSet.forEach(function(e) {
			unionSet.add(e)
		})
		return unionSet
	}
	// change code below this line
	intersection(otherSet: SetList) {
		const values = otherSet.values()
		const valuesThis = this.values()
		const uniq = values.filter(val => valuesThis.some(v => v === val))
		const set = new SetList()
		uniq.forEach(v => set.add(v))
		return set
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
console.log(setA.intersection(setB))
