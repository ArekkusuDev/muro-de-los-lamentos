import type { Year, GameInstance } from '@/types'
import { Player } from './characters/player'
import { Soul } from './characters/soul'
import { handleSouls } from './utils/sketch'

interface State {
	souls: Soul[]
	year: Year | null
}

// global player instance
let player: Player

function setup(p5: GameInstance) {
	return () => {
		p5.createCanvas(800, 600)

		player = new Player(p5, {})
	}
}

function draw(p5: GameInstance, state: State) {
	return () => {
		p5.background(202)
		player.show(p5)
		player.move(p5)

		if (state.souls.length && state.year) {
			handleSouls(p5, state.souls, player, state.year)
		}
	}
}

export function gameSketch(p5: GameInstance) {
	let state: State = {
		souls: [],
		year: null
	}

	p5.setup = setup(p5)

	p5.draw = draw(p5, state)

	p5.updateWithProps = props => {
		// create souls for each student
		const souls = props.students.map((_, index) => new Soul(p5, index))

		state = Object.assign(state, {
			souls,
			...props
		})
	}
}
