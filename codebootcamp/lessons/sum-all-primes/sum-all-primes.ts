/**
 * Intermediate Algorithm Scripting: Sum All Primes
 *
 * A prime number is a whole number greater than 1 with exactly two divisors: 1 and itself.
 * For example, 2 is a prime number because it is only divisible by 1 and 2.
 * In contrast, 4 is not prime since it is divisible by 1, 2 and 4.
 *
 * Rewrite sumPrimes so it returns the sum of all prime numbers that are less than or equal to num.
 *
 */

function sumPrimes(num: number): number {
	// is prime
	const isPrime = (num: number): boolean => {
		for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
			if (num % i === 0) return false
		}
		return num > 1
	}
	// create array of numbers
	const r = []
	for (let i = 1; i <= num; i++) {
		if (isPrime(i)) r.push(i)
	}

	return r.reduce((acc, curr) => acc + curr)
}

console.log(sumPrimes(10)) // should return a 17.
console.log(sumPrimes(977)) // should return 73156.
