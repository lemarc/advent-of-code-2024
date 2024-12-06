import {processLines} from '../common.js'

const DAY = 'day04'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

function process(lines) {
	const map = []

	let sum1 = 0
	let sum2 = 0

	for (const line of lines) {
		map.push(line)
	}

	const yLength = map.length
	const xLength = map[0].length

	for (let y = 0; y < yLength; y++) {
		for (let x = 0; x < xLength; x++) {
			sum1 += xmas(map, x, y, xLength, yLength)
		}
	}

	for (let y = 1; y < yLength -1; y++) {
		for (let x = 1; x < xLength - 1; x++) {
			sum2 += mas(map, x, y)
		}
	}

	console.log('Part 1')
	console.log('XMAS Sum = ' + sum1 + '\n')

	console.log('Part 2')
	console.log('MAS Sum = ' + sum2 + '\n')
}

function xmas(map, x, y, xLength, yLength) {
	let total = 0

	if (map[y][x] != 'X') {
		return total
	}

	// N, NE, E, SE, S, SW, W, NW
	const xDirs = [0, 1, 1, 1, 0, -1, -1, -1]
	const yDirs = [-1, -1, 0, 1, 1, 1, 0 ,-1]

	for (let i = 0; i < xDirs.length; i++) {
		const dx = xDirs[i]
		const dy = yDirs[i]

		const y3 = y + dy * 3
		const x3 = x + dx * 3
		
		// check bounds
		if (y3 < 0 ||
			y3 >= yLength ||
			x3 < 0 ||
			x3 >= xLength) {
			continue
		}

		const y1 = y + dy
		const x1 = x + dx
		const y2 = y + dy * 2
		const x2 = x + dx * 2

		if (map[y1][x1] == 'M' &&
			map[y2][x2] == 'A' &&
			map[y3][x3] == 'S') {
			total++
		}
	}

	return total
}

function mas(map, x, y) {

	if (map[y][x] != 'A') {
		return 0
	}
	let mCount = 0
	let sCount = 0

	// NW, NE, SW, SE
	const xs = [-1,1,-1,1]
	const ys = [-1,-1,1,1]

	for (let i=0; i< xs.length; i++) {
		const char = map[y + ys[i]][x + xs[i]]
		if (char == 'M') {
			mCount++

			if (mCount > 2) {
				return 0
			}
		} else if (char == 'S') {
			sCount++

			if (sCount > 2) {
				return 0
			}
		} else {
			return 0
		}
	}

    // exclude if MAM/SAS
	if (map[y-1][x-1] == map[y+1][x+1]) {
		return 0
	}

	return 1
}

processLines(sampleFile, process)

processLines(inputFile, process)


