import {processLines} from '../common.js'

const DAY = 'day01'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

function process(lines) {
	const left = []
	const right = []
	const rightCount = {}

	for (const line of lines) {
		const values = line.split('   ').map(v=>parseInt(v))

		addInOrder(left, values[0])
		addInOrder(right, values[1])

		countValues(rightCount, values[1])
	}

	let distance = 0;
	for (let i = 0; i < left.length; i++) {
		distance += Math.abs(left[i] - right[i])
	}
	console.log('Part 1')
	console.log('Distance = ' + distance + '\n')

	let similarity = 0
	for (let i = 0; i < left.length; i++) {
		let v = left[i]
		let c = rightCount[v] || 0
		similarity += v * c
	}
	console.log('Part 2')
	console.log('Similarity = ' + similarity + '\n')
}

function addInOrder(list, value) {
	for (let i = 0; i < list.length; i++) {
		if (value < list[i]) {
			list.splice(i,0,value)
			return
		}
	}
	
	list.push(value)
}

function countValues(count, value) {
	if (!count[value]) {
		count[value] = 1
	} else {
		count[value]++
	}
}

processLines(sampleFile, process)

processLines(inputFile, process)





