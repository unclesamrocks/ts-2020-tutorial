var displayTree = <T>(tree: BinarySearchTree<T>) => console.log(JSON.stringify(tree, null, 3))

class NodeType<T> {
	constructor(public value: T, public left: NodeType<T> | null = null, public right: NodeType<T> | null = null) {}
}
class BinarySearchTree<T> {
	constructor(public root: NodeType<T> | null = null) {}

	findMin(): T | null | undefined {
		if (!this.root) return null
		let curr = this.root
		while (curr) {
			if (curr.left) curr = curr.left
			else return curr.value
		}
	}
	findMax(): T | null | undefined {
		if (!this.root) return null
		let curr = this.root
		while (curr) {
			if (curr.right) curr = curr.right
			else return curr.value
		}
	}
	// change code below this line
	add(num: number): null | undefined {
		const n = (new NodeType(num) as any) as NodeType<T>
		if (!this.root) {
			this.root = n
			return undefined
		}
		// case root present.
		let curr = this.root
		while (curr) {
			// case equal values
			if (curr.value === n.value) return null
			// case moving down the tree
			const isLeftSide = curr.value > n.value ? true : false
			if (isLeftSide) {
				// left side
				if (curr.left) {
					curr = curr.left
				} else {
					curr.left = n
					break
				}
			} else {
				// right side
				if (curr.right) {
					curr = curr.right
				} else {
					curr.right = n
					break
				}
			}
		}
		return undefined
	}
	// change code above this line
}

/*==============================================
                INIT
===============================================*/
const vals = [3, 1, -10, 33, 200, 40, 2, 8, 108]

const tree = new BinarySearchTree<number>()

for (let i = 0; i < vals.length; i++) {
	tree.add(vals[i])
}

console.log(vals)
displayTree(tree)
console.log(tree.findMin())
console.log(tree.findMax())
