import { gameConfig } from '@/config'
import type { GameInstance, MapInstance } from '@/types/game'
import type { Image, Vector } from '@/types/p5'

interface PlayerProps {
	map: MapInstance
	image: Image | null
	runningImage: Image | null
}

export class Player {
	public position: Vector
	public velocity: Vector
	public size: number
	private character_velocity: number
	private image: Image | null
	private runninImage: Image | null
	private direction: 'left' | 'right'
	private isRunning: boolean
	private shadowSize: number
	private shadowOpacity: number
	private floatingOffset: number
	private floatingSpeed: number
	private floatingTime: number

	constructor(p5: GameInstance, props: PlayerProps) {
		// this.position = p5.createVector(this.worldSize / 2, this.worldSize / 2)
		this.position = props.map.getRandomPosition(p5, 0)
		this.velocity = p5.createVector(0, 0)
		this.size = gameConfig.player.size
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
		const imageResize = this.isRunning
			? gameConfig.player.imageRunningResize
			: gameConfig.player.imageResize
		const floatingY = Math.sin(this.floatingTime) * this.floatingOffset
		this.floatingTime += this.floatingSpeed

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
					imageResize,
					imageResize
				)
			} else {
				p5.image(
					currentImage,
					this.position.x,
					this.position.y + floatingY,
					imageResize,
					imageResize
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
		// Also allow arrow keys
		const isAPressed = p5.keyIsDown(65) || p5.keyIsDown(37)
		const isDPressed = p5.keyIsDown(68) || p5.keyIsDown(39)
		const isSPressed = p5.keyIsDown(83) || p5.keyIsDown(40)
		const isWPressed = p5.keyIsDown(87) || p5.keyIsDown(38)

		if (isAPressed) {
			newVelocity.x -= this.character_velocity
			this.direction = 'left'
		}
		if (isDPressed) {
			newVelocity.x += this.character_velocity
			this.direction = 'right'
		}
		if (isWPressed) newVelocity.y -= this.character_velocity
		if (isSPressed) newVelocity.y += this.character_velocity

		// Only run if shift is pressed while moving
		if (p5.keyIsDown(16) && (isAPressed || isDPressed || isWPressed || isSPressed)) {
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
		this.position.x = p5.constrain(
			this.position.x,
			this.size / 2,
			gameConfig.map.size - this.size / 2
		)
		this.position.y = p5.constrain(
			this.position.y,
			this.size / 2,
			gameConfig.map.size - this.size / 2
		)
	}
}

export type PlayerInstance = InstanceType<typeof Player>
