import {processLines, emptyMap, inBounds} from '../common.js'

const DAY = 'day11'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

function process(lines) {
	const initial = lines[0].split(' ').map(v=>parseInt(v))
	let numbers = initial.slice()

	for (let b = 0; b < 25; b++) {
		numbers = blink(numbers)
	}

	console.log('Part 1')
	console.log('Numbers = ' + numbers.length + '\n')

	//for (let i = 0; i < initial.length; i++) {
	//	numbers = [initial[i]]
	//
	//}

	const count = {}
	numbers = [36869184]
	count[numbers[0]] = 1
	console.log(numbers)
	for (let b = 0; b < 11; b++) {
		numbers = blink(numbers)
		//numbers.sort(function(a, b){return b - a});
		//console.log(numbers)
		for (const n of numbers) {
			if (count[n] == null) {
				count[n] = 1
			} else {
				count[n]++
			}
		}
	}
	console.log(count)
	console.log(Object.keys(count).length)

	console.log('Part 2')
	console.log('Stones = ' + 0 + '\n')
}

function blinkFast(numbers, blinks) {
	let sum = 0;

	for (let i = 0; i < numbers.length; i++) {
		sum = reapply([numbers[i]], blinks, sum)
	}

	return sum
}

function blink(numbers) {
	let altered = []

	for (let i = 0; i < numbers.length; i++) {
		altered.push(...apply(numbers[i]))
	}

	return altered
}

function apply(number) {
	if (number == 0) {
		return [1]
	}
	const numStr = number + ''
	if (numStr.length % 2 == 0) {
		const mid = numStr.length / 2
		const left = parseInt(numStr.slice(0, mid))
		const right = parseInt(numStr.slice(mid, numStr))
		return [left, right]
	}
	return [number * 2024]
}




processLines(sampleFile, process)

//console.time('Execution time')
//await processLines(inputFile, process)
//console.timeEnd('Execution time')


