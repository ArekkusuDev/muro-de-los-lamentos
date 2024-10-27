import { GameContext, GameContextType } from '@/context/GameContext'
import { useContext } from 'react'

export function useGameContext(): GameContextType {
	const context = useContext(GameContext)

	if (context === undefined) {
		throw new Error('useGameContext must be used within a GameContextProvider')
	}

	return context
}
