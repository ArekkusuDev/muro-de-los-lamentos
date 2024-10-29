import type { GameInstance } from '@/types/game'
import type { SoulProps } from '@/types/soul'
import { Image, Vector } from 'p5'

export class Soul {
	public id: string
	public size: number
	public position: Vector
	public detectionRadius: number
	private image: Image | null
	private found: boolean = false

	constructor(p5: GameInstance, props: SoulProps) {
		this.id = props.id
		this.size = 40
		this.image = props.image
		this.detectionRadius = 70
		this.position = props.map.getRandomPosition(p5, 1)
	}

	public getId() {
		return this.id
	}

	public setFound(found: boolean) {
		this.found = found
	}

	public isFound() {
		return this.found
	}

	public draw(p5: GameInstance) {
		if (this.image) {
			p5.push()
			p5.imageMode(p5.CENTER)
			if (this.found) {
				p5.tint(255, 150)
			}
			p5.image(this.image, this.position.x, this.position.y, this.size, this.size)
			p5.pop()
		} else {
			this.drawFallback(p5)
		}
	}

	private drawFallback(p5: GameInstance) {
		p5.push()
		if (this.found) {
			p5.fill(150, 0, 0, 150)
		} else {
			p5.fill(255, 0, 0)
		}
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
