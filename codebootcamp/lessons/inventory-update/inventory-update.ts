/*==============================================
Algorithms: Inventory UpdatePassed

Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery. Update the current existing inventory item quantities (in arr1). If an item cannot be found, add the new item and quantity into the inventory array. The returned inventory array should be in alphabetical order by item.
===============================================*/

function updateInventory(arr1: Array<[number, string]>, arr2: Array<[number, string]>): Array<[number, string]> {
	arr2.forEach(itemArr => {
		const indexOfItem = arr1.findIndex(el => el[1] === itemArr[1])
		if (indexOfItem === -1) arr1.push(itemArr)
		else arr1[indexOfItem][0] += itemArr[0]
	})
	// All inventory must be accounted for or you're fired!
	return arr1.sort((a, b) => (a[1].charAt(0) > b[1].charAt(0) ? 1 : -1))
}

console.log(
	updateInventory(
		[
			[21, 'Bowling Ball'],
			[2, 'Dirty Sock'],
			[1, 'Hair Pin'],
			[5, 'Microphone']
		],
		[
			[2, 'Hair Pin'],
			[3, 'Half-Eaten Apple'],
			[67, 'Bowling Ball'],
			[7, 'Toothpaste']
		]
	)
)
// should return [[88, "Bowling Ball"], [2, "Dirty Sock"], [3, "Hair Pin"], [3, "Half-Eaten Apple"], [5, "Microphone"], [7, "Toothpaste"]].)
console.log(
	updateInventory(
		[],
		[
			[2, 'Hair Pin'],
			[3, 'Half-Eaten Apple'],
			[67, 'Bowling Ball'],
			[7, 'Toothpaste']
		]
	)
)
// should return [[67, "Bowling Ball"], [2, "Hair Pin"], [3, "Half-Eaten Apple"], [7, "Toothpaste"]])
