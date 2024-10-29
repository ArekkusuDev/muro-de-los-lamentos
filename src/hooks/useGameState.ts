import type { Year } from '@/types/api'
import type { GameState } from '@/types/game'
import { useEffect, useState } from 'react'

const DEFAULT_GAME_STATE: GameState = {
	isGameStarted: false,
	year: undefined
}

export function useGameState() {
	const [gameState, setGameState] = useState<GameState>(() => {
		const storedState = sessionStorage.getItem('game_state')

		return storedState ? JSON.parse(storedState) : DEFAULT_GAME_STATE
	})

	useEffect(() => {
		sessionStorage.setItem('game_state', JSON.stringify(gameState))
	}, [gameState])

	const toggleGameStart = () => {
		setGameState(prevState => ({
			...prevState,
			isGameStarted: !prevState.isGameStarted
		}))
	}

	// undefined is used to "reset" the year
	const setYear = (year: Year | undefined) => {
		setGameState(prevState => ({
			...prevState,
			year
		}))
	}

	return { ...gameState, toggleGameStart, setYear }
}
