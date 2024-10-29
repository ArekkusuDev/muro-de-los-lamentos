import type { GameConfig } from '@/types/config'

export const gameConfig: GameConfig = {
	map: {
		size: 2000,
		rows: 60,
		columns: 60
	},
	player: {
		size: 20,
		imageResize: 80,
		imageRunningResize: 60
	}
}
