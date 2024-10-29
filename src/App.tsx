import { Suspense, lazy } from 'react'
import { useGameContext } from '@/hooks/useGameContext'
import { LoadingSpinner } from '@/components/LoadingSpinner'

const Home = lazy(() => import('@/components/Home'))
const Game = lazy(() => import('@/components/Game'))

export default function App() {
	const { isGameStarted } = useGameContext()

	return (
		<main className='flex flex-col'>
			<Suspense fallback={<LoadingSpinner />}>{isGameStarted ? <Game /> : <Home />}</Suspense>
		</main>
	)
}
