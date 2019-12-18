class SetList {
	protected collection: any[]

	constructor() {
		// collection will hold our set
		this.collection = []
	}
	// this method will check for the presence of an element and return true or false
	has(element: any) {
		return this.collection.indexOf(element) !== -1
	}
	// this method will return all the values in the set
	values() {
		return this.collection
	}
	// change code below this line

	// write your add method here
	add(item: any) {
		if (!this.has(item)) {
			this.collection.push(item)
			return true
		}
		return false
	}
	// write your remove method here
	remove(item: any) {
		if (!this.has(item)) return false
		this.collection = this.collection.filter(elm => elm != item)
		return true
	}
	// write your size method here
	size() {
		return this.collection.length
	}
	// change code above this line
}
