import {processLines, emptyMap, inBounds} from '../common.js'

const DAY = 'day13'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

function process(lines) {
	let sum1 = 0
	let sum2 = 0

	const machines = []
	let l = 0
	while (l < lines.length) {
		let [,, ax, ay] = lines[l++].split(' ')
		let [,, bx, by]= lines[l++].split(' ')
		let [,px, py] = lines[l++].split(' ')
		l++

		ax = parseInt(ax.slice(2, ax.length - 1))
		ay = parseInt(ay.slice(2, ay.length))

		bx = parseInt(bx.slice(2, bx.length - 1))
		by = parseInt(by.slice(2, by.length))

		px = parseInt(px.slice(2, px.length - 1))
		py = parseInt(py.slice(2, py.length))

		machines.push({ax,ay,bx,by,px,py})
	}

	console.log('Part 1')
	console.log('Sum = ' + part1(machines) + '\n')

	console.log('Part 2')
	console.log('Sum = ' + part2(machines) + '\n')
}

function part1(machines) {
	let tokens = 0
	for (const machine of machines) {
		const {ax, ay, bx, by, px, py } = machine

		const press = presses(ax, ay, bx, by, px , py)
		if (press != null) {
			tokens += press[0] * 3 + press[1]
		}
	}
	return tokens
}

function part2(machines) {
	const offset = 10000000000000
	let tokens = 0
	for (const machine of machines) {
		const {ax, ay, bx, by, px, py} = machine

		const press = presses(ax, ay, bx, by, px + offset , py + offset)
		if (press != null) {
			tokens += press[0] * 3 + press[1]
		}
	}
	return tokens
}

function presses(ax, ay, bx, by, px, py) {
	const bPress = (px * ay - py * ax) / (bx * ay - by * ax)
	if (Number.isInteger(bPress)) {
		const aPress = (px - bPress * bx) / ax
		if (Number.isInteger(aPress)) {
			return [aPress, bPress]
		}
	}
}


processLines(sampleFile, process)

console.time('Execution time')
await processLines(inputFile, process)
console.timeEnd('Execution time')


