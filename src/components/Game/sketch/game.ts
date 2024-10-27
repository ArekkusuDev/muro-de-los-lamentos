import { Api } from '@/lib/api'
import type { Year } from '@/types'
import type { P5CanvasInstance } from '@p5-wrapper/react'
import { Player } from './characters/player'
import { Soul } from './characters/soul'
import { displayTooltip } from './utils/tooltip'

let player: Player
// this array going to be update with updateWithProps later
let souls: Soul[] = []
let year: Year | undefined = undefined

function setup(p5: P5CanvasInstance) {
	return () => {
		p5.createCanvas(1000, 600)

		// create instance of player
		player = new Player(p5, {})

		if (year) {
			//  souls are based on the students of the year selected
			const soulsData = Api.getStudentsByYear(year)
			souls = soulsData.map((_, index) => new Soul(p5, index))
		}
	}
}

function draw(p5: P5CanvasInstance) {
	return () => {
		p5.background(202)
		player.show(p5)
		player.move(p5)

		// show all souls
		for (const soul of souls) {
			soul.show(p5)

			if (soul.collision(player.position)) {
				const student = year ? Api.getStudentByIndex(year, soul.getId()) : null

				if (student) {
					displayTooltip(p5, soul.position.x, soul.position.y, 'Presione E para mostrar')
				}
			}
		}
	}
}

export function gameSketch(p5: P5CanvasInstance) {
	p5.setup = setup(p5)

	p5.draw = draw(p5)

	p5.updateWithProps = props => {
		if (props.year) {
			year = props.year as Year
		}
	}
}
