import {processLines, emptyMap, inBounds} from '../common.js'

const DAY = 'day14'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

function process(lines) {
	const width = 101 // 11 
	const height = 103 // 7 

	const robots = []
	for(const line of lines) {
		let [p, v] = line.split(' ')

		let [px, py] = p.split(',')
		let [vx, vy] = v.split(',')

		px = parseInt(px.slice(2))
		py = parseInt(py)
		vx = parseInt(vx.slice(2))
		vy = parseInt(vy)

		robots.push({px, py, vx, vy})
	}

	console.log('Part 1')
	console.log('Safety Factor = ' + move(robots, 100, width, height) + '\n')

	console.log('Part 2')

	for (let t = 0; t < 10000; t++) {
		print(robots, t, width, height)
	}
}

function move(robots, time, width, height) {
	
	const cx = (width - 1) / 2
	const cy = (height - 1) / 2

	const quadrants = new Uint16Array(4)

	for (const robot of robots) {
		let {px, py, vx, vy} = robot
		if (vx < 0) vx+=width
		if (vy < 0) vy+=height

		const x = (px + vx * time) % width
		const y = (py + vy * time) % height

		if (x > cx) {
			if (y > cy) {
				quadrants[0]++
			} else if (y < cy) {
				quadrants[1]++
			} 
		} else if (x < cx) {
			if (y > cy) {
				quadrants[2]++
			} else if (y < cy) {
				quadrants[3]++
			} 
		}
	}
	return quadrants[0] * quadrants[1] * quadrants[2] * quadrants[3]
}

function print(robots, time, width, height) {
	const map = emptyMap(width, height)

	for (const robot of robots) {
		let {px, py, vx, vy} = robot
		if (vx < 0) vx+=width
		if (vy < 0) vy+=height

		const x = (px + vx * time) % width
		const y = (py + vy * time) % height

		map[y][x] = true
	}

	console.log('Time = ' + time)
	for(let y = 0; y < height; y++) {
		let s = ''
		for (let x = 0; x < width; x++) {
			if (map[y][x]) {s+='X'} else {s+=' '}
		}
		console.log(s)
	}
	console.log('\n')
}

//processLines(sampleFile, process)

console.time('Execution time')
await processLines(inputFile, process)
console.timeEnd('Execution time')


