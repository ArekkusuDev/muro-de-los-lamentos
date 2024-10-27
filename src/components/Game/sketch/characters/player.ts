import type { GameInstance } from '@/types'
import type { Vector } from 'p5'

interface PlayerProps {
	size?: number
	velocity?: number
}

export class Player {
	public position: Vector
	public velocity: Vector
	public size: number
	private character_velocity: number

	constructor(p5: GameInstance, props: PlayerProps) {
		this.position = p5.createVector(p5.width / 2, p5.height / 2)
		this.velocity = p5.createVector(0, 0)
		this.size = props.size ?? 20
		this.character_velocity = props.velocity ?? 3
	}

	public show(p5: GameInstance) {
		p5.fill(0, 0, 255)
		p5.square(this.position.x, this.position.y, this.size)
	}

	public move(p5: GameInstance) {
		const newVelocity = p5.createVector(0, 0)

		// A
		if (p5.keyIsDown(65)) {
			newVelocity.x -= this.character_velocity
		}

		// D
		if (p5.keyIsDown(68)) {
			newVelocity.x += this.character_velocity
		}

		// S
		if (p5.keyIsDown(87)) {
			newVelocity.y -= this.character_velocity
		}

		// W
		if (p5.keyIsDown(83)) {
			newVelocity.y += this.character_velocity
		}

		// shift key to run
		if (p5.keyIsDown(16)) {
			newVelocity.mult(2)
		}

		this.position.add(newVelocity)
		this.velocity = newVelocity

		// limit the player to the canvas
		this.position.x = p5.constrain(this.position.x, 0, p5.width - this.size)
		this.position.y = p5.constrain(this.position.y, 0, p5.height - this.size)
	}
}
