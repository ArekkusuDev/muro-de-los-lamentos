import { Home } from '@/components/Home'
import { Game } from '@/components/Game'
import { useGameContext } from '@/hooks/useGameContext'

export default function App() {
	const { isGameStarted } = useGameContext()

	return <main className='flex flex-col'>{isGameStarted ? <Game /> : <Home />}</main>
}
