import type { ButtonHTMLAttributes } from 'react'
import type { P5CanvasInstance, SketchProps } from '@p5-wrapper/react'

export interface Student {
	name: string
	lastnames: string
	student_id: string
	email: string
	group: string
	code: string[] | string
	signup_date: string
}

// add more years if needed (i hope)
export type Year = '2024'

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
}

export type GameProps = SketchProps & {
	students: Student[]
	year: Year
	onUpdateGameInfo?: (info: GameInfo) => void
	onSetup?: () => void
}

export type GameInstance = P5CanvasInstance<GameProps>

export interface GameInstanceState {
	souls: Soul[]
	year: Year | null
	camera: { x: number; y: number }
	onUpdateGameInfo?: (info: GameInfo) => void
	onSetup?: () => void
}
