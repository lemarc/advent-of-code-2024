import {processLines, emptyMap, inBounds} from '../common.js'

const DAY = 'day11'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

const history = {}

function process(lines) {
	const initial = lines[0].split(' ').map(v=>parseInt(v))

	console.log('Part 1')
	console.log('Numbers = ' + blinkBetter(initial, 25) + '\n')

	console.log('Part 2')
	console.log('Stones = ' + blinkBetter(initial, 75) + '\n')
}

function blink(numbers) {
	let altered = []

	for (let i = 0; i < numbers.length; i++) {
		altered.push(...apply(numbers[i]))
	}

	return altered
}

function apply(number) {
	if (history[number] == null) {
		if (number == 0) {
			history[number] = [1]
		} else {
			const numStr = number + ''
			if (numStr.length % 2 == 0) {
				const mid = numStr.length / 2
				const left = parseInt(numStr.slice(0, mid))
				const right = parseInt(numStr.slice(mid, numStr))
				history[number] = [left, right]
			} else {
				history[number] = [number * 2024]
			}
			
		}
	}
	return history[number]
}


function blinkBetter(stones, blinks) {
	let count = {}
	for (const stone of stones) {
		if (count[stone] == null) {
			count[stone] = 1
		} else {
			count[stone]++
		}
	}

	for (let b = 0; b < blinks; b++) {
		let newCount = {}
		for (const number in count) {
			const split = apply(number)

			for (const n of split) {
				if (newCount[n] == null) {
					newCount[n] = count[number]
				} else {
					newCount[n] += count[number]
				}
			}
		}
		count = newCount
	}

	let sum = 0
	for (const number in count) {
		sum += count[number]
	}
	return sum
}

processLines(sampleFile, process)

console.time('Execution time')
await processLines(inputFile, process)
console.timeEnd('Execution time')


