import {processLines} from '../common.js'

const DAY = 'day02'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

function process(lines) {
	let safeReports = 0
	for (const line of lines) {
		const report = line.split(' ').map(v=>parseInt(v))

		if (findFault(report) == -1) safeReports++

	}
	console.log('Part 1')
	console.log('Safe Reports = ' + safeReports + '\n')

	safeReports = 0;
	for (const line of lines) {
		const report = line.split(' ').map(v=>parseInt(v))

		let index = findFault(report)

		if (index == -1) {
			safeReports++
		} else {
			const r1 = report.slice()
			r1.splice(index, 1)
			if (findFault(r1) == -1) {
				safeReports++
				continue
			}
			
			const r2 = report.slice()
			r2.splice(index+1, 1)
			if (findFault(r2) == -1) {
				safeReports++
				continue
			}

			// also have to check previous in case it was due to direction on first pair
			if (index == 1) {
				const r3 = report.slice()
				r3.splice(index-1, 1)
				if (findFault(r3) == -1) {
					safeReports++
					continue
				}
			}
		}
	}
	console.log('Part 2')
	console.log('Safe Reports (/w dampen) = ' + safeReports + '\n')
}

function findFault(report) {

	let prev = 0

	for (let i = 0; i< report.length-1; i++) {
		let a = report[i]
		let b = report[i+1]

		let diff = b - a

		if (diff * prev < 0 || diff == 0 || diff > 3 || diff < -3) {
			return i
		}

		prev = diff
	}

	return -1
}

processLines(sampleFile, process)

processLines(inputFile, process)


