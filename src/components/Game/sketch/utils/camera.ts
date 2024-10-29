import type { GameInstance, GameInstanceState } from '@/types/game'
import type { Player } from '../characters/player'

export function updateCamera(p5: GameInstance, state: GameInstanceState, player: Player) {
	const targetX = player.position.x - p5.width / 2
	const targetY = player.position.y - p5.height / 2

	const lerp = 0.1
	state.camera.x += (targetX - state.camera.x) * lerp
	state.camera.y += (targetY - state.camera.y) * lerp
}
