import type { GameInstance, GameInstanceState } from '@/types'
import { Player } from './characters/player'
import { Soul } from './characters/soul'
import { updateCamera } from './utils/camera'
import { clearSoulsCache, drawWorld, handleSouls } from './utils/sketch'

// global player instance
let player: Player

function setup(p5: GameInstance) {
	return () => {
		p5.createCanvas(800, 600)
		player = new Player(p5, {})
	}
}

function draw(p5: GameInstance, state: GameInstanceState) {
	return () => {
		p5.background(202)
		p5.push()
		p5.translate(-state.camera.x, -state.camera.y)

		drawWorld(p5)
		player.show(p5)
		player.move(p5)

		if (state.souls.length && state.year) {
			handleSouls(p5, state.souls, player, state.year).catch(error => {
				console.error(`Error handling souls: ${error}`)
			})
		}

		updateCamera(p5, state, player)

		p5.pop()
	}
}

function keyPressed(p5: GameInstance, state: GameInstanceState) {
	return () => {
		if (p5.keyCode === 69) {
			state.souls.forEach(soul => {
				if (soul.collision(player.position)) {
					console.log('collision')
				}
			})
		}
	}
}

export function gameSketch(p5: GameInstance) {
	let state: GameInstanceState = {
		souls: [],
		year: null,
		camera: { x: 0, y: 0 }
	}

	p5.setup = setup(p5)

	p5.draw = draw(p5, state)

	p5.keyPressed = keyPressed(p5, state)

	p5.updateWithProps = props => {
		clearSoulsCache()

		// create souls for each student
		const souls = props.students.map((_, index) => new Soul(p5, index))

		state = Object.assign(state, {
			souls,
			...props
		})
	}
}
