import {processLines, emptyMap, inBounds} from '../common.js'

const DAY = 'day12'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

const delta = [
		[0,-1],
		[1, 0],
		[0, 1],
		[-1,0]
	]

function process(lines) {

	const xLength = lines[0].length
	const yLength = lines.length

	const plot = emptyMap(xLength, yLength)


	for (let y = 0; y < yLength; y++) {
		const line = lines[y]
		for (let x = 0; x < xLength; x++) {
			plot[y][x] = line[x]
		}
	}




	console.log('Part 1')
	console.log('Sum = ' + price(plot,xLength,yLength) + '\n')

	console.log('Part 2')
	console.log('Sum = ' + 0 + '\n')
}

function price(plot, xLength, yLength) {
	let cost = 0
	const counted = emptyMap(xLength, yLength)

	for (let y = 0; y< yLength; y++) {
		for (let x = 0 ; x< xLength; x++) {
			if (!counted[y][x]) {
				const region = {area:0, perimeter:0, id:plot[y][x]}
				traverse(plot, xLength, yLength, x, y, region, counted)
				//console.log(region.id + ': area=' + region.area + ', perimeter=' + region.perimeter)
				cost += region.area * region.perimeter
			}
		}
	}

	return cost
}

function traverse(plot, xLength, yLength, x, y, region, counted, dir) {
	if (!inBounds(x, y, xLength, yLength) || plot[y][x] != region.id) {
		region.perimeter++
		return
	}

	if (!counted[y][x]) {
		counted[y][x] = true
		region.area++
		for (let d = 0; d < 4; d++) {
			traverse(plot, xLength, yLength, x + delta[d][0], y + delta[d][1], region, counted, d)
		}
	}
}

function collinear(x1, y1, x2, y2, x3, y3) {
  return (y1 - y2) * (x1 - x3) == (y1 - y3) * (x1 - x2);
}

processLines(sampleFile, process)

console.time('Execution time')
await processLines(inputFile, process)
console.timeEnd('Execution time')


