import { ReactP5Wrapper } from '@p5-wrapper/react'
import { gameSketch } from './sketch/game'
import { useGameContext } from '@/hooks/useGameContext'
import { ExitButton } from './components/ExitButton'
import { YearsMenu } from './components/YearsMenu'
import { Api } from '@/lib/api'

export function Game() {
	const { year, setYear, toggleGameStart } = useGameContext()
	const yearsList = Api.getYearsList()

	return (
		<section className='flex flex-col h-full items-center gap-2 py-4'>
			<div className='flex flex-col w-11/12 gap-8 justify-between items-center py-2 lg:flex-row'>
				<h1 className='text-center mb-4 text-4xl font-extrabold lg:text-5xl uppercase'>
					El Muro de{' '}
					<span className='text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500'>
						Los Lamentos
					</span>
				</h1>
				<ExitButton
					year={year}
					setYear={setYear}
					toggleGameStart={toggleGameStart}
				/>
			</div>

			{year ? (
				<ReactP5Wrapper
					sketch={gameSketch}
					year={year}
				/>
			) : (
				<YearsMenu
					yearsList={yearsList}
					setYear={setYear}
				/>
			)}
		</section>
	)
}
