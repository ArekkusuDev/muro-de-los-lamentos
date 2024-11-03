import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useGameContext } from '@/hooks/useGameContext'
import { Suspense, lazy } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const Home = lazy(() => import('@/components/Home'))
const Game = lazy(() => import('@/components/Game'))

export default function App() {
	const { isGameStarted } = useGameContext()

	return (
		<main className='flex flex-col'>
			<Header />
			<Suspense fallback={<LoadingSpinner />}>{isGameStarted ? <Game /> : <Home />}</Suspense>
			<Footer />
		</main>
	)
}
