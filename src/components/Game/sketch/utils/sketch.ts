import type { GameInstance } from '@/types'
import type { Soul } from '../characters/soul'
import type { Player } from '../characters/player'
import type { Year } from '@/types'
import { Api } from '@/lib/api'
import { displayTooltip } from './tooltip'

export function handleSouls(p5: GameInstance, souls: Soul[], player: Player, year: Year) {
	for (const soul of souls) {
		soul.show(p5)

		if (soul.collision(player.position)) {
			const student = Api.getStudentByIndex(year, soul.getId())

			displayTooltip(
				p5,
				soul.position.x,
				soul.position.y,
				`Presione E para mostrar información de ${student.nombre}`
			)
		}
	}
}
