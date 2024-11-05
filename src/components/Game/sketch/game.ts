import type { GameInstance, PropsState, StaticState } from '@/types/game'
import { updateCamera } from './utils/camera'
import { clearSoulsCache, handleSouls, soulOnKeyPress } from './utils/sketch'

async function loadDependencies() {
	const [{ Player }, { GameMap }, { Soul }] = await Promise.all([
		import('./characters/player'),
		import('./map/GameMap'),
		import('./characters/soul')
	])

	return { Player, GameMap, Soul }
}

export async function createGameSketch() {
	const { Player, GameMap, Soul } = await loadDependencies()
	let player: InstanceType<typeof Player>
	const map = new GameMap()

	const propsState: PropsState = {
		souls: [],
		year: null,
		onUpdateGameInfo: undefined,
		onSetup: undefined
	}

	const state: StaticState = {
		isInitialized: false,
		camera: { x: 0, y: 0 },
		assets: {
			deadTombstone: null,
			liveTombstone: null,
			playerImage: null,
			playerRunningImage: null
		}
	}

	return function gameSketch(p5: GameInstance) {
		p5.preload = () => {
			state.assets.deadTombstone = p5.loadImage('/assets/DeadTombstone.avif')
			state.assets.liveTombstone = p5.loadImage('/assets/AliveTombstone.avif')
			state.assets.playerImage = p5.loadImage('/assets/ghost.avif')
			state.assets.playerRunningImage = p5.loadImage('/assets/ghost_running.avif')
		}

		p5.setup = () => {
			p5.createCanvas(1000, 600)
			player = new Player(p5, {
				map,
				image: state.assets.playerImage!,
				runningImage: state.assets.playerRunningImage!
			})

			if (propsState.onSetup) {
				propsState.onSetup()
			}

			if (propsState.onUpdateGameInfo) {
				propsState.onUpdateGameInfo({
					remainigStudents: propsState.souls.length - 1,
					foundStudents: 0
				})
			}
		}

		p5.draw = () => {
			p5.background(18, 18, 18)
			p5.push()

			p5.translate(-state.camera.x, -state.camera.y)

			map.draw(p5, state.camera)

			if (propsState.souls.length && propsState.year) {
				handleSouls(p5, propsState.souls, player, state.camera).catch(error => {
					console.error(`Error handling souls: ${error}`)
				})
			}

			player.draw(p5)
			player.move(p5)
			updateCamera(p5, state.camera, player)

			p5.pop()
		}

		p5.keyPressed = () => {
			if (p5.keyCode === 70) {
				const result = soulOnKeyPress(propsState.souls, player.position)

				if (propsState.onUpdateGameInfo && result) {
					propsState.onUpdateGameInfo({
						remainigStudents: result.totalSouls - result.foundSouls,
						foundStudents: result.foundSouls
					})
				}
			}
		}

		p5.updateWithProps = props => {
			try {
				// only clear cache and update souls if year or students change
				if (props.year !== propsState.year || propsState.souls.length !== props.students.length) {
					clearSoulsCache()

					propsState.souls = props.students.map(student => {
						const image =
							student.code.length === 3 ? state.assets.liveTombstone : state.assets.deadTombstone

						return new Soul(p5, {
							student,
							map,
							image
						})
					})
				}

				Object.assign(propsState, {
					...props
				})
			} catch (error) {
				console.error(error)
			}
		}
	}
}
