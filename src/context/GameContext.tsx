import type { Year } from '@/types/api'
import type { GameState } from '@/types/game'
import { createContext } from 'react'

export interface GameContextType extends GameState {
	toggleGameStart: () => void
	setYear: (year: Year | undefined) => void
}

export const GameContext = createContext<GameContextType | undefined>(undefined)
