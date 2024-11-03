import type { Student, Year } from '@/types/api'
import type { GameInfo, GameInstance } from '@/types/game'
import { ReactP5Wrapper } from '@p5-wrapper/react'
import { useEffect, useState } from 'react'

interface GameCanvasProps {
	year: Year
	students: Student[]
	onUpdateGameInfo: (info: GameInfo) => void
}

export default function GameCanvas({ year, students, onUpdateGameInfo }: GameCanvasProps) {
	const [loadingSketch, setLoadingSketch] = useState(true)
	const [gameSketch, setGameSketch] = useState<((p5: GameInstance) => void) | undefined>(undefined)

	useEffect(() => {
		const loadGameSketch = async () => {
			const { createGameSketch } = await import('../sketch/game')
			const sketch = await createGameSketch()

			setGameSketch(() => sketch)
		}

		loadGameSketch()
	}, [])

	return (
		<div className='w-[1000px] h-[600px] max-w-[1000px] max-h-[600px]'>
			{/* If the game sketch is not loaded, show a placeholder */}
			{loadingSketch && (
				<div className='flex items-center justify-center w-[1000px] h-full bg-base rounded-lg z-50'>
					<div
						className='border-[#CBA6F7] h-20 w-20 animate-spin rounded-full border-8 border-t-transparent'
						role='status'
						aria-label='loading'
					></div>
				</div>
			)}

			{gameSketch &&
				<ReactP5Wrapper
					sketch={gameSketch}
					year={year}
					students={students}
					onUpdateGameInfo={onUpdateGameInfo}
					onSetup={() => setLoadingSketch(false)}
				/>
			}
		</div>
	)
}
