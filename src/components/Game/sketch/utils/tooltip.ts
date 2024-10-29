import type { GameInstance } from '@/types'
import type { Student } from '@/types'

export function genTextStudent(student: Student) {
	const { name, lastnames, student_id, email, group, code } = student
	const codeText = Array.isArray(code) ? `Códigos: ${code.join(', ')}` : `Código: ${code}`

	return [
		`Nombre: ${name}`,
		`Apellidos: ${lastnames}`,
		`Matrícula: ${student_id}`,
		`Correo: ${email}`,
		`Grupo: ${group.toUpperCase()}`,
		codeText
	].join('\n')
}

export function displayTooltip(p5: GameInstance, x: number, y: number, text: string) {
	const WORLD_SIZE = 2000
	const PADDING = 10

	const lines = text.split('\n')
	const lineHeight = p5.textAscent() + p5.textDescent()
	const tooltipHeight = lineHeight * lines.length + PADDING * 2
	const tooltipWidth = Math.max(...lines.map(line => p5.textWidth(line))) + PADDING * 2

	let tooltipX = x - tooltipWidth / 2
	let tooltipY = y - tooltipHeight - 20

	tooltipX = p5.constrain(tooltipX, 0, WORLD_SIZE - tooltipWidth)
	tooltipY = p5.constrain(tooltipY, 0, WORLD_SIZE - tooltipHeight)

	p5.push()
	p5.fill(255, 255, 200)
	p5.noStroke()
	p5.rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 5)

	p5.fill(0)
	p5.textAlign(p5.LEFT, p5.TOP)
	// p5.text(text, tooltipX + tooltipWidth / 2, tooltipY + tooltipHeight / 2)
	lines.forEach((line, index) => {
		const lineY = tooltipY + PADDING + lineHeight * index
		const lineX = tooltipX + PADDING
		p5.text(line, lineX, lineY)
	})
	p5.pop()
}

export function displayTooltipStudent(p5: GameInstance, x: number, y: number, student: Student) {
	displayTooltip(p5, x, y, genTextStudent(student))
}
