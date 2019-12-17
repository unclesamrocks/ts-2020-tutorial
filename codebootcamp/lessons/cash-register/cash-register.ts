/**
 *
 * Currency Unit	    Amount
 * Penny	            $0.01 (PENNY)
 * Nickel	            $0.05 (NICKEL)
 * Dime	                $0.1 (DIME)
 * Quarter	            $0.25 (QUARTER)
 * Dollar	            $1 (DOLLAR)
 * Five Dollars	        $5 (FIVE)
 * Ten Dollars	        $10 (TEN)
 * Twenty Dollars	    $20 (TWENTY)
 * One-hundred Dollars	$100 (ONE HUNDRED)
 *
 */

type CashType = 'PENNY' | 'NICKEL' | 'DIME' | 'QUARTER' | 'ONE' | 'FIVE' | 'TEN' | 'TWENTY' | 'ONE HUNDRED'
type CashRegister = [CashType, number][]
type CashTypes = CashType[]

interface Change {
	status: 'OPEN' | 'CLOSED' | 'INSUFFICIENT_FUNDS'
	change: CashRegister
}

type Register = {
	[T in CashType]: number
}

const CASH_COST: CashRegister = [
	['PENNY', 0.01],
	['NICKEL', 0.05],
	['DIME', 0.1],
	['QUARTER', 0.25],
	['ONE', 1],
	['FIVE', 5],
	['TEN', 10],
	['TWENTY', 20],
	['ONE HUNDRED', 100]
]
CASH_COST.reverse()

function round(num: number): number {
	return Math.round(num * 100) / 100
}

function checkCashRegister(price: number, cash: number, cid: CashRegister): Change {
	let change: Change = {
		status: 'OPEN',
		change: []
	}
	const register = (cid.reduce(
		(acc, curr) => ({
			...acc,
			[curr[0]]: Math.round(curr[1] / CASH_COST.find(currArr => currArr[0] === curr[0])![1])
		}),
		{}
	) as any) as Register
	// console.log('[register]', register)
	let left = round(cash - price)
	// console.log('[left]', left)
	/*==============================================
                    change loop
    ===============================================*/
	while (left > 0) {
		// 1. determine which amount should be handled change
		const currency = CASH_COST.find(currencyArr => left >= currencyArr[1] && register[currencyArr[0]] > 0)!
		// 1.1. INSUFFICIENT_FUNDS
		if (!currency) return { status: 'INSUFFICIENT_FUNDS', change: [] }
		// 2. start decrement
		left = round(left - currency[1])
		// 3. upd `change` object
		const indexOfCurr = change.change.findIndex(currencyArr => currencyArr[0] === currency[0])
		if (indexOfCurr === -1) change.change.push([currency[0], currency[1]])
		else change.change[indexOfCurr][1] = round(change.change[indexOfCurr][1] + currency[1])
		// 4. upd register
		register[currency[0]] = round(register[currency[0]] - 1)
	}
	// CLOSED
	// a lot to process to match challange test result object on CLOSED status
	if (Object.keys(register).every(currency => register[currency as CashType] === 0)) {
		change.status = 'CLOSED'
		change.change = change.change.concat(cid.filter(currencyArr => !change.change.some(currArr => currArr[0] === currencyArr[0])).map(currencyArr => [currencyArr[0], 0]))
	}
	// Here is your change, ma'am.
	return change
}

console.log(
	checkCashRegister(19.5, 20, [
		['PENNY', 1.01],
		['NICKEL', 2.05],
		['DIME', 3.1],
		['QUARTER', 4.25],
		['ONE', 90],
		['FIVE', 55],
		['TEN', 20],
		['TWENTY', 60],
		['ONE HUNDRED', 100]
	])
)
// should return { status: 'OPEN', change: [ [ 'QUARTER', 0.5 ] ] }

console.log(
	checkCashRegister(3.26, 100, [
		['PENNY', 1.01],
		['NICKEL', 2.05],
		['DIME', 3.1],
		['QUARTER', 4.25],
		['ONE', 90],
		['FIVE', 55],
		['TEN', 20],
		['TWENTY', 60],
		['ONE HUNDRED', 100]
	])
)
// should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.)

console.log(
	checkCashRegister(19.5, 20, [
		['PENNY', 0.01],
		['NICKEL', 0],
		['DIME', 0],
		['QUARTER', 0],
		['ONE', 0],
		['FIVE', 0],
		['TEN', 0],
		['TWENTY', 0],
		['ONE HUNDRED', 0]
	])
)
// should return {status: "INSUFFICIENT_FUNDS", change: []}.)

console.log(
	checkCashRegister(19.5, 20, [
		['PENNY', 0.5],
		['NICKEL', 0],
		['DIME', 0],
		['QUARTER', 0],
		['ONE', 0],
		['FIVE', 0],
		['TEN', 0],
		['TWENTY', 0],
		['ONE HUNDRED', 0]
	])
)
// should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.)

console.log(
	checkCashRegister(19.5, 20, [
		['PENNY', 0.01],
		['NICKEL', 0],
		['DIME', 0],
		['QUARTER', 0],
		['ONE', 1],
		['FIVE', 0],
		['TEN', 0],
		['TWENTY', 0],
		['ONE HUNDRED', 0]
	])
)
// should return {status: "INSUFFICIENT_FUNDS", change: []}.)
