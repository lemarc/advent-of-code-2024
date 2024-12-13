import {processLines} from '../common.js'

const DAY = 'day07'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

function process(lines) {
	let sum1 = 0
	let sum2 = 0

	const equations = []

	for (const line of lines){
		const [value, numbers] = line.split(': ')

		equations.push({value: parseInt(value), numbers: numbers.split(' ').map(v=>parseInt(v))})
	}


	for (const equation of equations) {
		if (calc(equation.value, equation.numbers)) {
			sum1 += equation.value
		}

		if (calc(equation.value, equation.numbers, true)) {
			sum2 += equation.value
		}
	}


	console.log('Part 1')
	console.log('Sum = ' + sum1 + '\n')

	console.log('Part 2')
	console.log('Sum = ' + sum2 + '\n')
}

function calc(goal, numbers, concat) {
	return recalc(goal, numbers[0], numbers.slice(1), concat)
}

function recalc(goal, current, remaining, concat) {

	if (current > goal) return false

	if (remaining.length == 0) {
		return (current == goal)
	}

	const nextVal = remaining[0]
	remaining = remaining.slice(1)

	if (recalc(goal, current + nextVal, remaining, concat)) {
		return true
	}

	if (recalc(goal, current * nextVal, remaining, concat)) {
		return true
	}

	if (concat) {
		const leftStr = '' + current + nextVal
		if (recalc(goal, parseInt(leftStr), remaining, concat)) {
			return true
		}
	}
}

processLines(sampleFile, process)

console.time('Execution time')
await processLines(inputFile, process)
console.timeEnd('Execution time')


