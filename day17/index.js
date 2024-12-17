import {processLines, emptyMap, inBounds} from '../common.js'

const DAY = 'day17'
const sampleFile = './' + DAY + '/sample.txt'
const inputFile = './' + DAY + '/input.txt'
console.log('Advent of Code - ' + DAY + '\n')

const combo = [
		()=>0,
		()=>1,
		()=>2,
		()=>3,
		register=>register.A,
		register=>register.B,
		register=>register.C,
		()=>console.log("INVALID")
	]

const instructions = [
		(register, operand, position)=>{
			register.A = ((register.A / (2**combo[operand](register))) | 0)
			return position+2
		},
		(register, operand, position)=>{
			register.B = (register.B ^ operand)
			return position+2
		},
		(register, operand, position)=>{
			register.B = (combo[operand](register) % 8)
			return position+2
		},
		(register, operand, position)=>{
			if (register.A == 0) {
				return position+2
			} else {
				return operand
			}
		},
		(register, operand, position)=>{
			register.B = (register.B ^ register.C)
			return position+2
		},
		(register, operand, position, ouput)=>{
			output.push(combo[operand](register) % 8)
			return position+2
		},
		(register, operand, position)=>{
			register.B = ((register.A / (2**combo[operand](register))) | 0)
			return position+2
		},
		(register, operand, position)=>{
			register.C = ((register.A / (2**combo[operand](register))) | 0)
			return position+2
		},
	]

function process(lines) {
	const register = {
		A: parseInt(lines[0].split(' ')[2]),
		B: parseInt(lines[1].split(' ')[2]),
		C: parseInt(lines[2].split(' ')[2])
	}

	const program = lines[4].split(' ')[1].split(',').map(v=>parseInt(v))

	const output = []
	let position = 0
	while (position < program.length - 1) {
		const opcode = program[position]
		const operand = program[position+1]

		position = instructions[opcode](register, operand, position, output)
	}


	console.log('Part 1')
	console.log(output.join(','))

	//console.log('Part 2')
}

processLines(sampleFile, process)

console.time('Execution time')
await processLines(inputFile, process)
console.timeEnd('Execution time')


