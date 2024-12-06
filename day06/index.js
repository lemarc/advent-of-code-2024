import {processLines} from '../common.js'

const DAY = 'day06'
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
	let sum1 = 0
	let sum2 = 0

	const xLength = lines[0].length
	const yLength = lines.length

	const barriers = emptyMap(xLength, yLength)
	const visited = emptyMap(xLength, yLength)
	const blocks = emptyMap(xLength, yLength)
	
	let start

	for (let y = 0; y < yLength; y++) {
		const line = lines[y]
		for (let x = 0; x < xLength; x++) {
			const char = line[x]
			if (char == '#') {
				barriers[y][x] = true
			} else if (char == '^') {
				start = [x, y]
			}
		}
	}

	let dir = 0
	let d = delta[dir]
	let [x, y] = start
	// count initial position
	visited[y][x] = [dir]
	sum1++

	while (true) {
		const nx = x + d[0]
		const ny = y + d[1]

		if (!inBounds(nx,ny,xLength,yLength)) break

		if (barriers[ny][nx]) {
			// turn
			dir = (dir + 1) % 4
			d = delta[dir]
		} else {
			// test if block in next position would result in loop
			if (!blocks[ny][nx] && findLoop(dir,x,y,xLength,yLength,barriers,visited)) {
				blocks[ny][nx] = true
				sum2++
			}

			x = nx
			y = ny

			if (visited[y][x] == null) {
				// first time at coords
				visited[y][x] = [dir]
				sum1++
			} else {
				visited[y][x].push(dir)
			}
		}
	}

	console.log('Part 1')
	console.log('Sum = ' + sum1 + '\n')

	console.log('Part 2')
	console.log('Sum = ' + sum2 + '\n')
}

function emptyMap(xLength, yLength) {
	const map = new Array(yLength)
	for (let y = 0; y< yLength; y++) {
		map[y] = new Array(xLength)
	}
	return map
}

function inBounds(x, y, xLength, yLength) {
	return x >= 0 && x < xLength && y >=0 && y < yLength
}

function findLoop(dir, x, y, xLength, yLength, barriers, visited) {
	// new map to track path traveled due to block
	const path = emptyMap(xLength, yLength)

	// rotate once
	dir = (dir + 1) % 4
	let d = delta[dir]

	while (inBounds(x, y, xLength, yLength)) {
		if (path[y][x] == null) {
			path[y][x] = [dir]
		} else if (path[y][x].includes(dir)) {
			// looping but not on a path the patrol normally travels
			// directions don't seem to explicitly say this shouldn't count
			return false
		} else {
			path[y][x].push(dir)
		}

		// if patrol returns to a previous position and direction, we know we will loop
		if (visited[y][x] && visited[y][x].includes(dir)) {
			return true
		}

		if (barriers[y][x]) {
			// go back and turn
			x -= d[0]
			y -= d[1]
			dir = (dir + 1) % 4
			d = delta[dir]
		}

		x += d[0]
		y += d[1]
		
	}
	return false
}

processLines(sampleFile, process)

console.time('Execution time')
await processLines(inputFile, process)
console.timeEnd('Execution time')


