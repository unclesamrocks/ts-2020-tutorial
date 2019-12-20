var displayTree = <T>(tree: BinarySearchTree<T>) => console.log(JSON.stringify(tree, null, 3))

class NodeType<T> {
	constructor(public value: T, public left: NodeType<T> | null = null, public right: NodeType<T> | null = null) {}
}
class BinarySearchTree<T> {
	constructor(public root: NodeType<T> | null = null) {}
	// change code below this line
	add(n: NodeType<T>, next?: NodeType<T> | undefined | null): null | undefined {
		if (!this.root) {
			this.root = n
			return undefined
		}
		// case root present
		let curr = next ? next : this.root
		// case equal values
		if (curr.value === n.value) return null
		// case moving down the tree
		const isLeftSide = curr.value > n.value ? true : false
		if (isLeftSide) {
			// left side
			if (curr.left) {
				this.add(n, curr.left)
			} else {
				curr.left = n
				// n.right = curr
				return undefined
			}
		} else {
			// right side
			if (curr.right) {
				this.add(n, curr.right)
			} else {
				curr.right = n
				// n.left = curr
				return undefined
			}
		}
	}
	// change code above this line
}

/*==============================================
                INIT
===============================================*/
const vals = [3, 1, -10, 33, 200, 40, 2, 8, 108]

const tree = new BinarySearchTree<number>()

for (let i = 0; i < vals.length; i++) {
	const node = new NodeType(vals[i])
	tree.add(node)
}

console.log(vals)
displayTree(tree)
