import type { GameInstance } from '@/types'
import { Vector } from 'p5'

export class Soul {
	public id: number
	public size: number
	public position: Vector
	public detectionRadius: number

	constructor(p5: GameInstance, id: number) {
		this.id = id
		this.size = 20
		this.detectionRadius = 70
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
		const WORLD_SIZE = 2000

		const x = p5.random(MARGIN, WORLD_SIZE - MARGIN)
		const y = p5.random(MARGIN, WORLD_SIZE - MARGIN)

		return p5.createVector(x, y)
	}

	public show(p5: GameInstance) {
		p5.push()

		p5.fill(255, 0, 0)
		p5.circle(this.position.x, this.position.y, this.size)

		p5.pop()
	}

	public collision(playerPosition: Vector, playerSize: number) {
		const distance = Vector.dist(this.position, playerPosition)

		return distance < this.size / 2 + playerSize / 2
	}

	public isInRange(playerPosition: Vector) {
		const distance = Vector.dist(this.position, playerPosition)

		return distance < this.detectionRadius
	}
}
