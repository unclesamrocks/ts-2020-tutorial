type Item = [string, number]

interface PriorityQueue {
	collection: Item[]
	printCollection: () => void
	enqueue: (element: Item) => void
	dequeue: () => Item | undefined
	size: () => number
	isEmpty: () => boolean
	front: () => Item
}

function PriorityQueue(this: PriorityQueue) {
	this.collection = []
	this.printCollection = function() {
		console.log(this.collection)
	}
	// Only change code below this line
	this.enqueue = element => {
		const closestPriorityIndex = this.collection.findIndex(el => el[1] > element[1])
		if (closestPriorityIndex === -1) this.collection.push(element)
		else {
			const before = this.collection.slice(0, closestPriorityIndex)
			const after = this.collection.slice(closestPriorityIndex)
			this.collection = [...before, element, ...after]
		}
	}
	this.dequeue = () => this.collection.shift() || undefined
	this.front = () => this.collection[0]
	this.size = () =>
		this.collection.reduce((acc, curr) => {
			// console.log(curr)
			return acc + 1
		}, 0)
	this.isEmpty = () => this.size() === 0
	// Only change code above this line
}

const collection = (new PriorityQueue() as any) as PriorityQueue

collection.printCollection()
console.log(collection.isEmpty())
collection.enqueue(['new stiff', 1])
collection.enqueue(['new asdsds', 1])
collection.enqueue(['Sometign', 2])
collection.enqueue(['GG WP', 2])
collection.enqueue(['Funk asa', 1])
collection.enqueue(['Hooli', 1])
collection.printCollection()
// collection.printCollection()
console.log(collection.size())
console.log(collection.dequeue())
console.log(collection.dequeue())
collection.printCollection()
