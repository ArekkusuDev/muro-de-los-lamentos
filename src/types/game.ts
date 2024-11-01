import type { Soul } from '@/components/Game/sketch/characters/soul'
import type { P5CanvasInstance, SketchProps } from '@p5-wrapper/react'
import type { Student, Year } from './api'

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
	camera: { x: number; y: number },
	onUpdateGameInfo?: (info: GameInfo) => void
	onSetup?: () => void
}
