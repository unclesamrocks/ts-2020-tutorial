class Item {
	next: Item | null = null
	constructor(public data: string, public prev: Item | null) {}
}

class DoublyLinkedList {
	constructor(protected head: Item | null = null, protected tail: Item | null = null) {}
	// change code below this line
	add = (data: string) => {
		// null head
		if (!this.head) {
			const node = new Item(data, null)
			this.head = node
			return node
		}
		// null tail
		if (!this.tail) {
			const node = new Item(data, this.head)
			this.head.next = node
			this.tail = node
			return node
		}
		// !null tail & head
		let last = this.tail
		const node = new Item(data, last)
		last.next = node
		this.tail = node
		return node
	}

	traverseLog = () => {
		let curr = this.head
		let count = 0
		console.log('================= START TRAVERSE =================')
		while (curr) {
			console.log(curr)
			count++
			curr = curr.next
		}
		console.log(`========={ ${count} }======== END OF TRAVERSE ========={ ${count} }========`)
	}

	updateEdges = (elem: Item) => {
		console.log('[update]\n', elem)
		// presumably we receive last item in set
		if (!elem.next && !elem.prev) this.head = elem
		if (!elem.next && elem.prev) {
			// main backwards logic
			this.tail = elem // updated tail
			let curr: Item | null = elem
			let prev = curr.prev
			while (prev) {
				prev.next = curr
				if (!prev.prev) {
					this.head = prev
					break
				}
				curr = prev
				prev = prev.prev
			}
		}
	}

	remove = (data: string) => {
		// case !head
		if (!this.head) return null
		// case !tail
		if (this.head && !this.tail) {
			if (this.head.data === data) {
				let item = this.head
				this.head = null
				return item
			}
		}
		// head & tail
		let curr: Item | null = this.head
		let prev: Item | null | undefined
		while (curr) {
			if (curr) {
				if (curr.data === data) {
					// check for equal data & MATCH data
					if (prev) {
						// update prev's next item
						// double sided connection
						prev.next = curr.next
						if (curr.next) curr.next.prev = prev
					} else {
						// if head element
						if (curr.next) curr.next.prev = null
					}
					// if match is last element
					if (!curr.next) break
				}
			}
			prev = curr
			curr = curr.next
		}
		this.updateEdges(prev!)
	}
	// change code above this line
}

/*==============================================
                INIT
===============================================*/

const list = new DoublyLinkedList()

var one = '[1] string One'
var two = '[2] string Two'
var three = '[3] string Three'
var four = '[4] string Four'
var five = '[5] string Five'

/*==============================================
                CHECK
===============================================*/
console.log(list)
console.log(list.add(one))
console.log(list.add(two))
console.log(list.add(four))
console.log(list.add(four))
console.log(list.add(four))
console.log(list.add(three))
console.log(list.add(four))
console.log(list.add(five))
list.remove(four)
list.remove(three)
list.remove(one)
list.remove(five)
list.remove(four)
list.remove(two)
list.traverseLog()
