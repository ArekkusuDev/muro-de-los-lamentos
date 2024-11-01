import type { GameInstance, GameInstanceState } from '@/types/game'
import p5 from 'p5'
import { Player } from './characters/player'
import { Soul } from './characters/soul'
import { GameMap } from './map/GameMap'
import { updateCamera } from './utils/camera'
import { clearSoulsCache, handleSouls, soulOnKeyPress } from './utils/sketch'

let state: GameInstanceState = {
	souls: [],
	year: null,
	camera: { x: 0, y: 0 },
	onUpdateGameInfo: undefined,
	onSetup: undefined
}

// global instances
let player: Player
let map: GameMap
let soulImage: p5.Image | null = null
let playerImage: p5.Image | null = null
let playerRunningImage: p5.Image | null = null

function preload(p5: GameInstance) {
	return () => {
		soulImage = p5.loadImage('/assets/tombstone.avif')
		playerImage = p5.loadImage('/assets/ghost.avif')
		playerRunningImage = p5.loadImage('/assets/ghost_running.avif')
		// preload map (fix: map is not loaded when the game is started)
		map = new GameMap()
	}
}

function draw(p5: GameInstance) {
	return () => {
		p5.background(18, 18, 18)
		p5.push()

		p5.translate(-state.camera.x, -state.camera.y)

		map.draw(p5, state.camera)

		if (state.souls.length && state.year) {
			handleSouls(p5, state.souls, player, state.year, state.camera).catch(error => {
				console.error(`Error handling souls: ${error}`)
			})
		}

		player.draw(p5)
		player.move(p5)
		updateCamera(p5, state, player)

		p5.pop()
	}
}

function keyPressed(p5: GameInstance) {
	return () => {
		if (p5.keyCode === 70) {
			const result = soulOnKeyPress(state.souls, player.position)

			if (state.onUpdateGameInfo && result) {
				state.onUpdateGameInfo({
					remainigStudents: result.totalSouls - result.foundSouls,
					foundStudents: result.foundSouls
				})
			}
		}
	}
}

export function gameSketch(p5: GameInstance) {
	p5.preload = preload(p5)
	p5.setup = () => {
		p5.createCanvas(1000, 600)
		player = new Player(p5, { map, image: playerImage!, runningImage: playerRunningImage! })

		if (state.onSetup && typeof state.onSetup === 'function') {
			state.onSetup()
		}
	}
	p5.draw = draw(p5)
	p5.keyPressed = keyPressed(p5)
	p5.updateWithProps = props => {
		try {
			// only clear cache and update souls if year or students change
			if (props.year !== state.year || state.souls.length !== props.students.length) {
				clearSoulsCache()
				map = new GameMap()

				state.souls = props.students.map(
					student => new Soul(p5, { id: student.student_id, map, image: soulImage })
				)
			}

			state = Object.assign(state, {
				...props,
				onUpdateGameInfo: props.onUpdateGameInfo,
				onSetup: props.onSetup
			})
		} catch (error) {
			console.error(error)
		}
	}
}
