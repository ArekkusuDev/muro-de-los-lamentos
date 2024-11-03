import type { Vector } from '@/types/p5'

type Viewport = {
	position: Vector
	camera: { x: number; y: number }
	screenWidth: number
	screenHeight: number
	margin?: number
}

export function isInViewport({
	position,
	camera,
	screenWidth,
	screenHeight,
	margin = 100
}: Viewport) {
	return (
		position.x >= camera.x - margin &&
		position.x <= camera.x + screenWidth + margin &&
		position.y >= camera.y - margin &&
		position.y <= camera.y + screenHeight + margin
	)
}
