import type { GameInstance } from '@/types'
import type { Vector } from 'p5'
import type { GameMap } from '../map/GameMap'

interface PlayerProps {
	map: GameMap
}

export class Player {
	public position: Vector
	public velocity: Vector
	public size: number
	private character_velocity: number
	private worldSize: number

	constructor(p5: GameInstance, props: PlayerProps) {
		this.worldSize = 2000
		// this.position = p5.createVector(this.worldSize / 2, this.worldSize / 2)
		this.position = props.map.getRandomPosition(p5, 0)
		this.velocity = p5.createVector(0, 0)
		this.size = 20
		this.character_velocity = 3
	}

	public draw(p5: GameInstance) {
		p5.push()
		p5.fill(0, 0, 255)
		p5.strokeWeight(0)
		p5.rectMode(p5.CENTER)
		p5.square(this.position.x, this.position.y, this.size)
		p5.pop()
	}

	public move(p5: GameInstance) {
		const newVelocity = p5.createVector(0, 0)

		// A
		if (p5.keyIsDown(65)) newVelocity.x -= this.character_velocity
		// D
		if (p5.keyIsDown(68)) newVelocity.x += this.character_velocity
		// S
		if (p5.keyIsDown(87)) newVelocity.y -= this.character_velocity
		// W
		if (p5.keyIsDown(83)) newVelocity.y += this.character_velocity
		// shift key to run
		if (p5.keyIsDown(16)) newVelocity.mult(2)

		this.position.add(newVelocity)
		this.velocity = newVelocity

		// limit the player to the canvas
		this.position.x = p5.constrain(this.position.x, this.size / 2, this.worldSize - this.size / 2)
		this.position.y = p5.constrain(this.position.y, this.size / 2, this.worldSize - this.size / 2)
	}
}
