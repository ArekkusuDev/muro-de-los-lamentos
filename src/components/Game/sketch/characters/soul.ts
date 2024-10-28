import type { GameInstance } from '@/types'
import type { GameMap } from '../map/GameMap'
import { Vector, Image } from 'p5'

interface SoulProps {
	id: number
	gameMap: GameMap
	image: Image | null
}

export class Soul {
	public id: number
	public size: number
	public position: Vector
	public detectionRadius: number
	private image: Image | null

	constructor(p5: GameInstance, props: SoulProps) {
		this.id = props.id
		this.size = 40
		this.image = props.image
		this.detectionRadius = 70
		this.position = props.gameMap.getRandomPosition(p5, 1)
	}

	public getId() {
		return this.id
	}

	public draw(p5: GameInstance) {
		if (this.image) {
			p5.push()
			p5.imageMode(p5.CENTER)
			p5.image(this.image, this.position.x, this.position.y, this.size, this.size)
			p5.pop()
		} else {
			this.drawFallback(p5)
		}
	}

	private drawFallback(p5: GameInstance) {
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
