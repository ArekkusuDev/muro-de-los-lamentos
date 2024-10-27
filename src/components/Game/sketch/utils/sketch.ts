import type { GameInstance, Student } from '@/types'
import type { Soul } from '../characters/soul'
import type { Player } from '../characters/player'
import type { Year } from '@/types'
import { Api } from '@/lib/api'
import { displayTooltip } from './tooltip'

interface SoulState {
	soul: Soul
	student?: Student
	isLoading: boolean
}

const soulsCache = new Map<number, SoulState>()

export async function handleSouls(p5: GameInstance, souls: Soul[], player: Player, year: Year) {
	let tooltipText = ''
	let tooltipPosition = { x: 0, y: 0 }
	let tooltipVisible = false

	for (const soul of souls) {
		soul.show(p5)

		if (soul.collision(player.position)) {
			let soulState = soulsCache.get(soul.getId())

			if (!soulState) {
				soulState = {
					soul,
					isLoading: true
				}
				soulsCache.set(soul.getId(), soulState)

				try {
					const student = await Api.getStudentByIndex(year, soul.getId())
					soulState.student = student
					soulState.isLoading = false
					soulsCache.set(soul.getId(), soulState)
				} catch (error) {
					console.error(`Error loading student: ${error}`)
					soulState.isLoading = false
				}
			}

			if (soulState.isLoading) {
				tooltipText = 'Cargando información...'
				tooltipPosition = { x: soul.position.x, y: soul.position.y }
				tooltipVisible = true
			} else if (soulState.student) {
				tooltipText = `Presione 'E' para mostrar información de ${soulState.student.nombre}`
				tooltipPosition = { x: soul.position.x, y: soul.position.y }
				tooltipVisible = true
			} else {
				tooltipText = 'Error al cargar información'
				tooltipPosition = { x: soul.position.x, y: soul.position.y }
				tooltipVisible = true
			}
		}
	}

	if (tooltipVisible) {
		displayTooltip(p5, tooltipPosition.x, tooltipPosition.y, tooltipText)
	}
}

export function clearSoulsCache() {
	soulsCache.clear()
}
