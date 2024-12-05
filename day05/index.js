import {processLines} from '../common.js'

const DAY = 'day05'
const sampleFile = './' + DAY + '/sample.txt'
const sampleFile2 = './' + DAY + '/sample-2.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')


function process(lines) {
	let sum1 = 0
	let sum2 = 0

	let l = 0
	let line

	const rules = {}

	while ((line = lines[l++]) != '') {
		const [p1, p2] = line.split('|').map(v=>parseInt(v))
		if (rules[p1] == null) {
			rules[p1] = []
		}
		rules[p1].push(p2)
	}

	const updates = []

	while (l < lines.length) {
		updates.push(lines[l++].split(',').map(v=>parseInt(v)))
	}

	for (const update of updates) {
		const error = findError(update, rules)
		if (error == null) {
			sum1+= update[(update.length-1)/2]
		} else {
			const sorted = sort(update, rules, error)
			sum2 += sorted[(sorted.length-1)/2]
		}

	}

	console.log('Part 1')
	console.log('Sum = ' + sum1 + '\n')

	console.log('Part 2')
	console.log('Sum = ' + sum2 + '\n')
}

function sort(update, rules, error) {
	const [p1, p2] = error
	const i2 = update.indexOf(p2)

	update.splice(i2, 1)

	const i1 = update.indexOf(p1)

	update.splice(i1+1, 0, p2)

	const newError = findError(update, rules)
	if (newError != null) {
		return sort(update, rules, newError)
	}

	return update
}

function findError(update, rules) {
	for (let i = 0; i< update.length; i++) {
		const page = update[i]
		const requiredPages = rules[page]
		if (requiredPages != null) {
			for (const requiredPage of requiredPages) {
				const ri = update.indexOf(requiredPage)
				if (ri >= 0 && ri < i) {
					return [page, requiredPage]
				}
			}
		}
	}
	return null
}

processLines(sampleFile, process)

processLines(inputFile, process)


