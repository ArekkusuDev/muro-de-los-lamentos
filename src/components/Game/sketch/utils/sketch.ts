import { Api } from '@/lib/api'
import type { GameInstance, Year } from '@/types'
import type { SoulState } from '@/types/soul'
import { Vector } from 'p5'
import type { Player } from '../characters/player'
import type { Soul } from '../characters/soul'
import { displayTooltip, genTextStudent } from './tooltip'

// cache to store the souls and their state
const soulsCache = new Map<string, SoulState>()
let lastInteractedSoul: string | null = null

/**
 * Handle all the souls in the game like drawing them, checking if the player is in range, and handling the collision
 * @param p5 current game instance of p5
 * @param souls list of souls to handle
 * @param player current player instance
 * @param year current year selected
 */
export async function handleSouls(p5: GameInstance, souls: Soul[], player: Player, year: Year) {
	let tooltipText = ''
	let tooltipPosition = { x: 0, y: 0 }
	let tooltipVisible = false
	let showStudentInfo = false
	let soulInRange = false

	if (p5.keyIsDown(70)) {
		showStudentInfo = true
	}

	for (const soul of souls) {
		const currentSoulState = soulsCache.get(soul.getId())
		if (currentSoulState?.found) {
			soul.setFound(true)
		}

		soul.draw(p5)

		const inRange = soul.isInRange(player.position)

		if (inRange) {
			soulInRange = true
			let soulState = soulsCache.get(soul.getId())

			if (!soulState) {
				soulState = {
					soul,
					isLoading: true
				}
				soulsCache.set(soul.getId(), soulState)

				try {
					const student = await Api.getStudentById(year, soul.getId())
					soulState.student = student
					soulsCache.set(soul.getId(), soulState)
					soulState.isLoading = false
				} catch (error) {
					console.error(`Error loading student: ${error}`)
					soulState.isLoading = false
				}
			}

			// TODO: This could be optimized to avoid creating the tooltip every frame (i think)
			if (soulState.isLoading) {
				tooltipText = 'Cargando información...'
			} else if (soulState.student) {
				if (showStudentInfo || lastInteractedSoul === soul.getId()) {
					tooltipText = genTextStudent(soulState.student)
					lastInteractedSoul = soul.getId()
				} else {
					tooltipText = `Presiona 'F' para mostrar información de ${soulState.student.name}`
				}
			} else {
				tooltipText = 'Error al cargar información'
			}

			tooltipPosition = { x: soul.position.x, y: soul.position.y }
			tooltipVisible = true
		}

		if (soul.collision(player.position, player.size)) {
			handleCollision(player, soul)
		}
	}

	if (!soulInRange) {
		lastInteractedSoul = null
	}

	if (tooltipVisible) {
		displayTooltip(p5, tooltipPosition.x, tooltipPosition.y, tooltipText)
	}
}

/**
 * Handle the collision between the player and a soul
 * @param player current player instance
 * @param soul current soul instance
 */
export function handleCollision(player: Player, soul: Soul) {
	const pushDirection = Vector.sub(player.position, soul.position)
	pushDirection.normalize()

	const minDistance = player.size / 2 + soul.size / 2
	const newPos = Vector.add(soul.position, pushDirection.mult(minDistance))

	player.position = newPos
}

/**
 * Handle the key press event on the game
 * @param souls list of souls in the game
 * @param playerPositon current player position
 */
export function soulOnKeyPress(souls: Soul[], playerPositon: Vector) {
	const soul = souls.find(soul => soul.isInRange(playerPositon))

	if (soul) {
		const soulState = soulsCache.get(soul.getId())

		if (soulState) {
			if (!soulState.found) {
				soulState.found = true
				soulsCache.set(soul.getId(), soulState)

				const foundSouls = Array.from(soulsCache.values()).filter(state => state.found).length

				return {
					foundSouls,
					totalSouls: souls.length
				}
			}

			const foundSouls = Array.from(soulsCache.values()).filter(state => state.found).length
			return {
				foundSouls,
				totalSouls: souls.length
			}
		}
	}

	return null
}

/**
 * Clear the cache of the souls
 */
export function clearSoulsCache() {
	soulsCache.clear()
}
