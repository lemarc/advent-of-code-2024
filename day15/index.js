import {processLines, emptyMap, inBounds} from '../common.js'

const DAY = 'day15'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

const delta = {
		'^':[0,-1],
		'>':[1, 0],
		'v':[0, 1],
		'<':[-1,0]
	}

function process(lines) {
	const xLength = lines[0].length
	const yLength = xLength

	const map = emptyMap(xLength, yLength)

	const robot = {}

	for (let y = 0;y < yLength; y++) {
		for (let x = 0; x < xLength; x++) {
			const char = lines[y][x]
			if (char == '.') {
				// dont care
			} else if (char == '@') {
				robot.x = x
				robot.y = y
			} else 
			map[y][x] = char

		}
	}
	const directions = lines.slice(yLength + 1).join('')

	move (robot, map, directions)
	let sum1 = 0
	for (let y = 0;y < yLength; y++) {
		for (let x = 0; x < xLength; x++) {
			if (map[y][x] == 'O') {
				sum1 += 100 * y + x
			}

		}
	}

	console.log('Part 1')
	console.log('Sum = ' + sum1 + '\n')

	console.log('Part 2')

}

function move(robot, map, directions) {
	for (const dir of directions) {
		const [dx, dy] = delta[dir]
		let {x, y} = robot
		x += dx
		y += dy
		const nx = x
		const ny = y
		while (map[y][x] != '#') {
			if (map[y][x] == null) {
				while (!(y == ny && x == nx)) {
					const bx = x - dx
					const by = y - dy
					map[y][x] = map[by][bx]
					x = bx
					y = by
				}
				map[ny][nx] = null // robot position
				robot.x = nx
				robot.y = ny
				break
			}
			x += dx
			y += dy
		}
	}
}


processLines(sampleFile, process)

console.time('Execution time')
await processLines(inputFile, process)
console.timeEnd('Execution time')


