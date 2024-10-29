import type { GameInstance } from '@/types'
import type { Image, Vector } from 'p5'
import type { GameMap } from '../map/GameMap'

interface PlayerProps {
	map: GameMap
	image: Image
	runningImage: Image
}

export class Player {
	public position: Vector
	public velocity: Vector
	public size: number
	private character_velocity: number
	private worldSize: number
	private image: Image
	private runninImage: Image
	private imageResize = 80
	private direction: 'left' | 'right'
	private isRunning: boolean
	private shadowSize: number
	private shadowOpacity: number
	private floatingOffset: number
	private floatingSpeed: number
	private floatingTime: number

	constructor(p5: GameInstance, props: PlayerProps) {
		this.worldSize = 2000
		// this.position = p5.createVector(this.worldSize / 2, this.worldSize / 2)
		this.position = props.map.getRandomPosition(p5, 0)
		this.velocity = p5.createVector(0, 0)
		this.size = 20
		this.character_velocity = 3
		this.image = props.image
		this.runninImage = props.runningImage
		this.direction = 'right'
		this.isRunning = false

		// Shadow and floating effect properties
		this.shadowSize = this.size * 2
		this.shadowOpacity = 0.3
		this.floatingOffset = 5
		this.floatingSpeed = 0.05
		this.floatingTime = 0
	}

	private drawShadow(p5: GameInstance) {
		p5.push()
		p5.noStroke()
		p5.fill(0, 0, 0, this.shadowOpacity * 255) // Black with transparency

		// Make shadow stretch when running
		const stretchFactor = this.isRunning ? 1.2 : 1
		const shadowWidth = this.shadowSize * stretchFactor
		const shadowHeight = this.shadowSize * 0.4 // Flatter shadow

		// Draw shadow as an ellipse
		p5.ellipseMode(p5.CENTER)
		p5.ellipse(this.position.x, this.position.y + this.size / 2, shadowWidth, shadowHeight)
		p5.pop()
	}

	public draw(p5: GameInstance) {
		this.imageResize = this.isRunning ? 60 : 80
		this.floatingTime += this.floatingSpeed
		const floatingY = Math.sin(this.floatingTime) * this.floatingOffset

		this.drawShadow(p5)

		p5.push()
		if (this.image && this.runninImage) {
			p5.imageMode(p5.CENTER)
			const currentImage = this.isRunning ? this.runninImage : this.image

			if (this.direction === 'left') {
				p5.scale(-1, 1)
				p5.image(
					currentImage,
					-this.position.x,
					this.position.y + floatingY,
					this.imageResize,
					this.imageResize
				)
			} else {
				p5.image(
					currentImage,
					this.position.x,
					this.position.y + floatingY,
					this.imageResize,
					this.imageResize
				)
			}
		} else {
			this.fallbackDraw(p5)
		}
		p5.pop()
	}

	public fallbackDraw(p5: GameInstance) {
		p5.fill(0, 0, 255)
		p5.strokeWeight(0)
		p5.rectMode(p5.CENTER)
		p5.square(this.position.x, this.position.y, this.size)
	}

	public move(p5: GameInstance) {
		const newVelocity = p5.createVector(0, 0)

		// A
		if (p5.keyIsDown(65)) {
			newVelocity.x -= this.character_velocity
			this.direction = 'left'
		}
		// D
		if (p5.keyIsDown(68)) {
			newVelocity.x += this.character_velocity
			this.direction = 'right'
		}
		// S
		if (p5.keyIsDown(87)) newVelocity.y -= this.character_velocity
		// W
		if (p5.keyIsDown(83)) newVelocity.y += this.character_velocity
		// shift key to run
		if (p5.keyIsDown(16)) {
			newVelocity.mult(2)
			this.isRunning = true
			this.shadowOpacity = 0.4
		} else {
			this.isRunning = false
			this.shadowOpacity = 0.3
		}

		this.position.add(newVelocity)
		this.velocity = newVelocity

		// limit the player to the canvas
		this.position.x = p5.constrain(this.position.x, this.size / 2, this.worldSize - this.size / 2)
		this.position.y = p5.constrain(this.position.y, this.size / 2, this.worldSize - this.size / 2)
	}
}
