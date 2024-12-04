import {processLines} from '../common.js'

const DAY = 'day03'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

// match do() don't() or mul(#,#)
const regex = /do\(\)|don\'t\(\)|mul\((\d+),(\d+)\)/g

function process(lines) {
	let sum1 = 0
	let sum2 = 0

	let enabled = true

	for (const line of lines) {

		const matches = line.matchAll(regex)

		for (const match of matches) {
			if (match[0] == 'do()') {
				enabled = true
			} else if (match[0] == "don't()") {
				enabled = false
			} else {
				const a = parseInt(match[1])
				const b = parseInt(match[2])
				sum1 += a * b
				if (enabled) {
					sum2 += a * b
				}
			}
		}
	}

	console.log('Part 1')
	console.log('Sum = ' + sum1 + '\n')

	console.log('Part 2')
	console.log('Enabled Sum = ' + sum2 + '\n')
}

processLines(sampleFile, process)

processLines(inputFile, process)


