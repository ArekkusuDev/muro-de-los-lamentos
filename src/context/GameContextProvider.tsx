import { ReactNode } from 'react'
import { GameContext } from './GameContext'
import { useGameState } from '@/hooks/useGameState'

interface GameProviderProps {
	children: ReactNode
}

export function GameContextProvider({ children }: GameProviderProps) {
	const { isGameStarted, year, toggleGameStart, setYear } = useGameState()

	return (
		<GameContext.Provider value={{ isGameStarted, year, toggleGameStart, setYear }}>
			{children}
		</GameContext.Provider>
	)
}
