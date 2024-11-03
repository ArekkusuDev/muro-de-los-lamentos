import type { Soul } from '@/components/Game/sketch/characters/soul'
import type { P5CanvasInstance, SketchProps } from '@p5-wrapper/react'
import { GameMap } from '@/components/Game/sketch/map/GameMap'
import { Player } from '@/components/Game/sketch/characters/player'
import type { Student, Year } from './api'
import type {Image} from './p5'

export type PlayerInstance = InstanceType<typeof Player>
export type MapInstance = InstanceType<typeof GameMap>

export type GameState = {
	isGameStarted: boolean
	year: Year | undefined
}

export type GameInfo = {
	remainigStudents: number
	foundStudents: number
}

export type GameProps = SketchProps & {
	students: Student[]
	year: Year
}

export type GameInstance = P5CanvasInstance<GameProps>

export type GameInstanceState = {
	souls: Soul[]
	year: Year | null
	camera: { x: number; y: number }
}

export type PropsState = {
	souls: Soul[]
	year: Year | null
	onUpdateGameInfo?: (info: GameInfo) => void
	onSetup?: () => void
}

export type StaticState = {
	camera: { x: number; y: number }
	isInitialized: boolean
	assets: {
		soulImage: Image | null
		playerImage: Image | null
		playerRunningImage: Image | null
	}
}
