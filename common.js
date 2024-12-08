import fs from 'fs'
import readline from 'readline'

export async function processLines(filename, process) {
	const fileStream = fs.createReadStream(filename)

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});
	// Note: we use the crlfDelay option to recognize all instances of CR LF
	// ('\r\n') in input.txt as a single line break.

	const lines = []
	for await (const line of rl) {
		lines.push(line)
	}

	console.log('File: ' + filename + '\n')
	process(lines)
}

export function emptyMap(xLength, yLength) {
	const map = new Array(yLength)
	for (let y = 0; y< yLength; y++) {
		map[y] = new Array(xLength)
	}
	return map
}


export function inBounds(x, y, xLength, yLength) {
	return x >= 0 && x < xLength && y >=0 && y < yLength
}