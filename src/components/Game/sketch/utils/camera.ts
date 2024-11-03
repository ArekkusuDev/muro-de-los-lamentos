import type { GameInstance } from '@/types/game';
import type { Player } from '../characters/player';

export function updateCamera(p5: GameInstance, camera: { x: number; y: number }, player: Player) {
	const targetX = player.position.x - p5.width / 2
	const targetY = player.position.y - p5.height / 2

	const lerp = 0.1
	camera.x += (targetX - camera.x) * lerp
	camera.y += (targetY - camera.y) * lerp
}
