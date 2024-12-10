import {processLines, emptyMap, inBounds} from '../common.js'

const DAY = 'day10'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

const delta = [
		[0,-1],
		[1, 0],
		[0, 1],
		[-1,0]
	]

function process(lines) {

	const xLength = lines[0].length
	const yLength = lines.length

	const map = emptyMap(xLength, yLength)

	for (let y = 0; y < yLength; y++) {
		const line = lines[y]
		for (let x = 0; x < xLength; x++) {
			map[y][x] = parseInt(line[x])
		}
	}

	const scores = scoreTrailheads(map, xLength, yLength)

	console.log('Part 1')
	console.log('Sum = ' + scores.unique + '\n')

	console.log('Part 2')
	console.log('Sum = ' + scores.total + '\n')
}

function scoreTrailheads(map, xLength, yLength) {
	const scores = {unique: 0, total: 0}
	for (let y = 0; y < yLength; y++) {
		for (let x = 0; x < xLength; x++) {
			if (map[y][x] == 0) {
				const peak = emptyMap(xLength, yLength)
				traverseTrailhead(map, xLength, yLength, x, y, 0, peak, scores)
			}
		}
	}
	return scores
}

function traverseTrailhead(map, xLength, yLength, x, y, height, peak, scores) {
	if (map[y][x] != height) {
		return
	}

	if (height == 9) {
		if (!peak[y][x]) {
			peak[y][x] = true
			scores.unique++
		}
		scores.total++
		return
	}

	for (let d = 0; d < 4; d++) {
		const nx = x + delta[d][0]
		const ny = y + delta[d][1]

		if (inBounds(nx,ny,xLength,yLength)) {
			traverseTrailhead(map, xLength, yLength, nx, ny, height+1, peak, scores)
		}
	}
}


processLines(sampleFile, process)

console.time('Execution time')
await processLines(inputFile, process)
console.timeEnd('Execution time')


