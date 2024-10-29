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
	map: new GameMap(),
	onUpdateGameInfo: undefined
}

// global instances
let player: Player
let soulImage: p5.Image | null = null

function preload(p5: GameInstance) {
	return () => {
		soulImage = p5.loadImage('/assets/tombstone.avif')
	}
}

function setup(p5: GameInstance) {
	return () => {
		p5.createCanvas(1000, 600)
		player = new Player(p5, { gameMap: state.map })
	}
}

function draw(p5: GameInstance) {
	return () => {
		p5.background(18, 18, 18)
		p5.push()
		p5.translate(-state.camera.x, -state.camera.y)

		state.map.draw(p5)
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
			if (state.onUpdateGameInfo) {
				state.onUpdateGameInfo({
					remainigStudents: state.souls.length - 1,
					foundStudents: 0
				})
			}
		}
	}
}

export function gameSketch(p5: GameInstance) {
	p5.preload = preload(p5)
	p5.setup = setup(p5)
	p5.draw = draw(p5)
	p5.keyPressed = keyPressed(p5)
	p5.updateWithProps = props => {
		try {
			if (props.year !== state.year || state.souls.length !== props.students.length) {
				clearSoulsCache()

				state.souls = props.students.map(
					(_, index) => new Soul(p5, { id: index, gameMap: state.map, image: soulImage })
				)
			}

			state = Object.assign(state, {
				...props,
				onUpdateGameInfo: props.onUpdateGameInfo
			})
		} catch (error) {
			console.error(error)
		}
	}
}
