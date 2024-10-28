import type { ButtonHTMLAttributes } from 'react'
import type { P5CanvasInstance, SketchProps } from '@p5-wrapper/react'
import { GameMap } from '@/components/Game/sketch/map/GameMap'

export interface Student {
	name: string
	lastnames: string
	nickname: string
}

// add more years if needed (i hope)
export type Year = '2024' | '2025'

export type StudentsData = Record<Year, Student[]>

export interface GameState {
	isGameStarted: boolean
	year: Year | undefined
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string
}

export interface GameInfo {
	remainigStudents: number
	foundStudents: number
	selectedStudent: Student | null
}

export type GameProps = SketchProps & {
	students: Student[]
	year: Year
	onUpdateGameInfo?: (info: GameInfo) => void
}

export type GameInstance = P5CanvasInstance<GameProps>

export interface GameInstanceState {
	souls: Soul[]
	year: Year | null
	camera: { x: number; y: number }
	map: GameMap
	onUpdateGameInfo?: (info: GameInfo) => void
}
