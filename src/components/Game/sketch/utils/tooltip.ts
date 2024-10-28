import type { GameInstance } from '@/types'
import type { Student } from '@/types'

export function genTextTooltip(student: Student) {
	return `Nombre: ${student.name}\nApellidos: ${student.lastnames}\nApodo: ${student.nickname}`
}

export function displayTooltip(p5: GameInstance, x: number, y: number, text: string) {
	const WORLD_SIZE = 2000
	const PADDING = 10
	const tooltipWidth = p5.textWidth(text) + PADDING * 2
	const tooltipHeight = p5.textAscent() + p5.textDescent() + PADDING * 2

	let tooltipX = x - tooltipWidth / 2
	let tooltipY = y - tooltipHeight - 20

	tooltipX = p5.constrain(tooltipX - PADDING / 2, 0, WORLD_SIZE - tooltipWidth)
	tooltipY = p5.constrain(tooltipY - PADDING / 2, 0, WORLD_SIZE - tooltipHeight)

	p5.push()
	p5.fill(255, 255, 200)
	p5.noStroke()
	p5.rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 5)

	p5.fill(0)
	p5.textAlign(p5.CENTER, p5.CENTER)
	p5.text(text, tooltipX + tooltipWidth / 2, tooltipY + tooltipHeight / 2)
	p5.pop()
}

export function displayTooltipStudent(p5: GameInstance, x: number, y: number, student: Student) {
	displayTooltip(p5, x, y, genTextTooltip(student))
}
