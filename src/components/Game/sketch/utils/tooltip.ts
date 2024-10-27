import type { GameInstance } from '@/types'
import type { Student } from '@/types'

export function genTextTooltip(student: Student) {
	return `Nombre: ${student.nombre}\nSemestre: ${student.semestre}\nGrupo: ${student.grupo}`
}

export function displayTooltip(p5: GameInstance, x: number, y: number, text: string) {
	const PADDING = 10
	const tooltipWidth = p5.textWidth(text) + PADDING * 2
	const tooltipHeight = p5.textAscent() + p5.textDescent() + PADDING * 2
	let tooltipX = x + 10
	let tooltipY = y - 30

	if (tooltipX + tooltipWidth > p5.width) {
		tooltipX = p5.width - tooltipWidth - 10
	} else if (tooltipX < 0) {
		tooltipX = 10
	}

	if (tooltipY < 0) {
		tooltipY = y + 10
	}

	p5.push()
	p5.fill(255, 255, 200)
	p5.noStroke()
	p5.rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 5)

	p5.fill(0)
	p5.textAlign(p5.LEFT, p5.CENTER)
	p5.text(text, tooltipX + PADDING, tooltipY + tooltipHeight / 2)
	p5.pop()
}

export function displayTooltipStudent(p5: GameInstance, x: number, y: number, student: Student) {
	displayTooltip(p5, x, y, genTextTooltip(student))
}
