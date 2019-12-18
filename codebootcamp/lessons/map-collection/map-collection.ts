interface MapType {
	collection: { [key: string]: any }
	add: (key: string, value: any) => void
	remove: (key: string) => void
	get: (key: string) => any
	has: (key: string) => boolean
	values: () => any[]
	size: () => number
	clear: () => void
}

class MapT implements MapType {
	constructor(public collection: { [key: string]: any } = {}) {}

	add(key: string, value: any) {
		this.collection[key] = value
	}
	remove(key: string) {
		delete this.collection[key]
	}

	get(key: string) {
		return this.collection[key]
	}

	has(key: string) {
		return this.collection.hasOwnProperty(key)
	}

	values() {
		return Object.keys(this.collection).map(key => this.collection[key])
	}

	size() {
		return Object.keys(this.collection).length
	}

	clear() {
		this.collection = {}
	}
}

const map = new MapT()

map.add('aaa', 'asdada')
map.add('bbb', 'asdasdsa')
map.add('ccc', 'asdasdsa')
console.log(map)
console.log(map.values())
