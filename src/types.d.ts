import type { P5CanvasInstance, SketchProps } from '@p5-wrapper/react'

export interface Student {
	nombre: string
	semestre: number
	grupo: string
}

export type Year = '2024' | '2025' | '2026' | '2027'

export type StudentsData = Record<Year, Student[]>

export interface GameState {
	isGameStarted: boolean
	year: Year | undefined
}

export type GameProps = SketchProps & {
	students: Student[]
	year: Year
}

export type GameInstance = P5CanvasInstance<GameProps>
