import { Suspense, lazy } from 'react'
import { useGameContext } from '@/hooks/useGameContext'

const Home = lazy(() => import('@/components/Home'))
const Game = lazy(() => import('@/components/Game'))

export default function App() {
	const { isGameStarted } = useGameContext()

	return (
		<main className='flex flex-col'>
			<Suspense fallback={<div>Loading...</div>}>{isGameStarted ? <Game /> : <Home />}</Suspense>
		</main>
	)
}
