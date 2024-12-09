import {processLines, emptyMap, inBounds} from '../common.js'

const DAY = 'day09'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

function process(lines) {
	let sum1 = 0
	let sum2 = 0

	const line = lines[0]

	const compact = new Uint8Array(line.length)

	for (let i = 0; i < line.length; i++) {
		compact[i] = parseInt(line[i])
	}
	sum1 = fragment(compact)
	sum2 = whole(compact)

	console.log('Part 1')
	console.log('Sum = ' + sum1 + '\n')

	console.log('Part 2')
	console.log('Sum = ' + sum2 + '\n')
}

function fragment(compact) {
	// copy since it gets modified
	compact = compact.slice()

	let sum = 0

	let a = 0
	let b = compact.length - 1

	let lastId = (compact.length / 2) >> 0

	let id = 0
	let position = 0
	while (a <= b) {	
		// file block
		let size = compact[a++]

		for (let i = 0; i < size; i++) {
			sum += id * position++
		}
		id++

		if (a > b) return sum

		// empty block
		size = compact[a++]
		let filled = 0
		while (filled < size) {
			if (compact[b] > 0) {
				filled++
				compact[b]--
				sum += lastId * position++ 
			} else {
				// get next non-empty block from the back
				while (compact[b] == 0) {
					b-=2
					lastId--
				}
				
				if (a > b) {
					return sum
				}
			}
		}
	}

	return sum
}

function whole(compact) {
	const files = new Array((compact.length + 1) / 2)
	const spaces = new Array((compact.length - 1) / 2)

	let f = 0;
	let s = 0
	let file = true
	let position = 0
	let id = 0
	for (const size of compact) {
		if (file) {
			files[f++] = {position: position, id: id++, size: size}
		} else {
			const ids = new Uint16Array(size)
			spaces[s++] = {position: position, ids: ids, remaining: size}
		}
		position += size
		file = !file
	}

	let firstSpace = 0

	for (f = files.length - 1; f > 0; f--) {
		const file = files[f]

		// find first empty space that will fit file
		for (s = firstSpace; s < spaces.length; s++) {
			const space = spaces[s]

			if (space.position > file.position) break;

			if (space.remaining >= file.size) {
				for (let i = 0; i < file.size; i++) {
					space.ids[space.ids.length - space.remaining +i] = file.id
				}
				space.remaining -= file.size
				files[f] = null
				break;
			}
		}

		// update first with space
		while (spaces[firstSpace] && spaces[firstSpace].remaining == 0) {
			firstSpace++
		}
	}

	let sum = 0

	for (const file of files) {
		if (file != null) {
			for (let i = 0; i < file.size; i++) {
				sum += (file.position + i) * file.id
			}
		}
	}

	for (const space of spaces) {
		for (let i = 0; i < space.ids.length; i++) {
			sum += (space.position + i) * space.ids[i]
		}
	}

	return sum
}

processLines(sampleFile, process)

console.time('Execution time')
await processLines(inputFile, process)
console.timeEnd('Execution time')


