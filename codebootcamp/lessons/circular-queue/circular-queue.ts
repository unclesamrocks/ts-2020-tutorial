class CircularQueue {
	protected queue: any[]
	protected read: number
	protected write: number
	protected max: number

	constructor(protected size: number) {
		this.queue = []
		this.read = 0
		this.write = 0
		this.max = size - 1

		while (size > 0) {
			this.queue.push(null)
			size--
		}
	}

	print() {
		return this.queue
	}

	enqueue(item: any) {
		// Only change code below this line
		if (this.queue[this.write] === null) {
			this.queue[this.write++] = item
			if (this.write > this.max) this.write = 0
			return item
		}
		return null
		// Only change code above this line
	}

	dequeue() {
		// Only change code below this line
		if (this.queue[this.read] != null) {
			const item = this.queue.splice(this.read++, 1, null)[0]
			if (this.read > this.max) this.read = 0
			return item
		}
		return null
		// Only change code above this line
	}
}

const queue = new CircularQueue(10)

console.log(queue.print())
queue.enqueue('new item')
console.log(queue.print())
queue.enqueue('another item')
queue.enqueue('another item')
queue.enqueue('another item')
queue.enqueue('another item')
queue.enqueue('another item')
queue.enqueue('another item')
queue.enqueue('another item')
queue.enqueue('another item')
queue.enqueue('another item')
queue.enqueue('new item')
queue.enqueue('new item')
console.log(queue.print())
console.log(queue.dequeue())
console.log(queue.print())
console.log(queue.dequeue())
console.log(queue.print())
console.log(queue.dequeue())
console.log(queue.print())
