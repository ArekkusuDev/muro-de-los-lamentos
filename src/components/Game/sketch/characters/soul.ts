import type { GameInstance } from '@/types'
import type { Vector } from 'p5'

export class Soul {
	public id: number
	public size: number
	public position: Vector

	constructor(p5: GameInstance, id: number) {
		this.id = id
		this.size = 20
		this.position = this.randomPosition(p5)
	}

	public getId() {
		return this.id
	}

	private randomPosition(p5: GameInstance) {
		const MARGIN = 30
		// use fixed width and height values
		// if we refresh the page too fast, the canvas will not be ready
		// and we get invalid p5.width and p5.height values
		const WIDTH = 800
		const HEIGHT = 600

		const x = p5.random(MARGIN, WIDTH - MARGIN)
		const y = p5.random(MARGIN, HEIGHT - MARGIN)

		return p5.createVector(x, y)
	}

	public show(p5: GameInstance) {
		p5.fill(255, 0, 0)
		p5.circle(this.position.x, this.position.y, 20)
	}

	public collision(player_position: Vector) {
		const distance = player_position.dist(this.position)

		return distance < this.size
	}
}
