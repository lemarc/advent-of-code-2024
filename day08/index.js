import {processLines, emptyMap, inBounds} from '../common.js'

const DAY = 'day08'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

function process(lines) {
	let sum1 = 0
	let sum2 = 0

	const signals = {}

	const xLength = lines[0].length
	const yLength = lines[1].length

	for (let y = 0; y < yLength; y++) {
		const line = lines[y]
		for (let x = 0; x < xLength; x++) {
			const char = line[x]

			if (char == '.') continue

			if (signals[char]) {
				signals[char].push([x,y])
			} else{ 
				signals[char] = [[x,y]]
			}
		}
	}

	sum1 = findAntinodes(signals, xLength, yLength)
	sum2 = findAntinodes(signals, xLength, yLength, true)

	console.log('Part 1')
	console.log('Sum = ' + sum1 + '\n')

	console.log('Part 2')
	console.log('Sum = ' + sum2 + '\n')


}

function findAntinodes(signals, xLength, yLength, any) {
	let sum = 0

	const antinodeMap = emptyMap(xLength, yLength)

	const signalIds = Object.keys(signals)

	for (const signalId of signalIds) {
		fillAntinodesForSignal(signalId, signals[signalId], antinodeMap, xLength, yLength, any)
	}

	for (const row of antinodeMap) {
		for (const antinode of row) {
			if (antinode != null) {
				sum++
			}
		}
	}

	return sum
}

function fillAntinodesForSignal(signalId, locations, antinodeMap, xLength, yLength, any) {
	for (let i = 0; i < locations.length - 1; i++) {
		const locA = locations[i]
		for (let j = i + 1; j < locations.length; j++) {
			const locB = locations[j]

			const dx = locB[0] - locA[0]
			const dy = locB[1] - locA[1]

			if (any) {
				// Part 2
				let x = locA[0]
				let y = locA[1]

				while (inBounds(x, y, xLength, yLength)) {
					addToAntinodeMap(antinodeMap, x, y, signalId)
					
					x -= dx
					y -= dy
				}

				x = locB[0]
				y = locB[1]

				while (inBounds(x, y, xLength, yLength)) {
					addToAntinodeMap(antinodeMap, x, y, signalId)
					
					x += dx
					y += dy
				}
			} else {
				// Part 1
				const xA = locA[0] - dx
				const yA = locA[1] - dy

				if (inBounds(xA, yA, xLength, yLength)) {
					addToAntinodeMap(antinodeMap, xA, yA, signalId)
				}

				const xB = locB[0] + dx
				const yB = locB[1] + dy

				if (inBounds(xB, yB, xLength, yLength)) {
					addToAntinodeMap(antinodeMap, xB, yB, signalId)
				}
			}

		}
	}
}

function addToAntinodeMap(antinodeMap, x, y, signalId) {
	if (antinodeMap[y][x] == null) {
		const antinodes = new Set()
		antinodes.add(signalId)
		antinodeMap[y][x] = antinodes
	} else {
		antinodeMap[y][x].add(signalId)
	}
}

processLines(sampleFile, process)

console.time('Execution time')
await processLines(inputFile, process)
console.timeEnd('Execution time')


