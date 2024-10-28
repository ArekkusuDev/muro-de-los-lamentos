import type { GameInstance, GameInstanceState } from '@/types'
import p5 from 'p5'
import { Player } from './characters/player'
import { Soul } from './characters/soul'
import { GameMap } from './map/GameMap'
import { updateCamera } from './utils/camera'
import { clearSoulsCache, handleSouls } from './utils/sketch'

let state: GameInstanceState = {
	souls: [],
	year: null,
	camera: { x: 0, y: 0 },
	gameMap: new GameMap()
}

// global instances
let player: Player
let soulImage: p5.Image | null = null

function preload(p5: GameInstance) {
	return () => {
		soulImage = p5.loadImage(
			'/assets/tombstone.avif',
			() => console.log('Imagen cargada correctamente'),
			err => console.error('Error al cargar la imagen:', err)
		)
	}
}

function setup(p5: GameInstance) {
	return () => {
		p5.createCanvas(900, 600)
		player = new Player(p5, { gameMap: state.gameMap })
	}
}

function draw(p5: GameInstance) {
	return () => {
		p5.background(18, 18, 18)
		p5.push()
		p5.translate(-state.camera.x, -state.camera.y)

		state.gameMap.draw(p5)
		player.draw(p5)
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

function keyPressed(p5: GameInstance) {
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
	p5.preload = preload(p5)
	p5.setup = setup(p5)
	p5.draw = draw(p5)
	p5.keyPressed = keyPressed(p5)
	p5.updateWithProps = props => {
		clearSoulsCache()

		try {
			const { gameMap } = state
			const souls = props.students.map(
				(_, index) => new Soul(p5, { id: index, gameMap, image: soulImage })
			)

			state = Object.assign(state, {
				souls,
				...props
			})
		} catch (error) {
			console.error(error)
		}
	}
}
