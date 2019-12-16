interface Planet {
	name: string
	avgAlt?: number
	orbitalPeriod?: number
}

function orbitalPeriod(arr: Planet[]): Planet[] {
	var GM = 398600.4418
	var earthRadius = 6367.4447
	const PI = Math.PI
	/**
	 * period = 2 * PI * Math.sqrt(Math.pow(earthRadius + avgAlt, 3) / GM)
	 */
	return arr.map(planet => ({
		name: planet.name,
		orbitalPeriod: Math.round(2 * PI * Math.sqrt(Math.pow(earthRadius + planet.avgAlt!, 3) / GM))
	}))
}

console.log(orbitalPeriod([{ name: 'sputnik', avgAlt: 35873.5553 }]))
console.log(
	orbitalPeriod([
		{ name: 'iss', avgAlt: 413.6 },
		{ name: 'hubble', avgAlt: 556.7 },
		{ name: 'moon', avgAlt: 378632.553 }
	])
)
