import { createContext } from 'react'
import type { GameState, Year } from '@/types'

export interface GameContextType extends GameState {
	toggleGameStart: () => void
	setYear: (year: Year | undefined) => void
}

export const GameContext = createContext<GameContextType | undefined>(undefined)
