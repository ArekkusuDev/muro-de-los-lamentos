import { useIsMobile } from '@/hooks/useIsMobile'
import { Year } from '@/types/api'
import { lazy, memo } from 'react'

const MobileGameLayout = lazy(() => import('./MobileLayout'))
const BrowserLayout = lazy(() => import('./BrowserLayout'))

const GameScreen = memo(function GameScreen({ year }: { year: Year }) {
	const isMobile = useIsMobile()

	return (
		<section className='font-jolly-lodger flex flex-col min-h-[calc(100vh-4.5rem)] pt-4'>
			{isMobile ? <MobileGameLayout year={year} /> : <BrowserLayout year={year} />}
		</section>
	)
})

export default GameScreen
