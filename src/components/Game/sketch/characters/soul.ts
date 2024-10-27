import type { P5CanvasInstance } from '@p5-wrapper/react'
import type { Vector } from 'p5'

export class Soul {
	public readonly id: number
	public readonly size: number
	public readonly position: Vector

	constructor(p5: P5CanvasInstance, id: number) {
		this.id = id
		this.size = 20
		this.position = this.randomPosition(p5)
	}

	public getId() {
		return this.id
	}

	private randomPosition(p5: P5CanvasInstance) {
		// each soul should be in a random position
		// but it shouldn't be outside the canvas
		const x = p5.random(0 + this.size, p5.width - this.size)
		const y = p5.random(0 + this.size, p5.height - this.size)

		return p5.createVector(x, y)
	}

	public show(p5: P5CanvasInstance) {
		p5.fill(255, 0, 0)
		p5.circle(this.position.x, this.position.y, 20)
	}

	public collision(player_position: Vector) {
		const distance = player_position.dist(this.position)

		return distance < this.size
	}
}
