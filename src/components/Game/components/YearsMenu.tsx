import type { Year } from '@/types/api'
import { CardButton } from './CardButton'
import { memo } from 'react'
import { ExitButton } from './ExitButton'
import { useGameContext } from '@/hooks/useGameContext'

export const YearsMenu = memo(function YearsMenu({ yearsList }: { yearsList: Year[] }) {
	const { year, toggleGameStart, setYear } = useGameContext()

	return (
		<section className='flex flex-col min-h-[calc(100vh-4.5rem)] items-center gap-2 py-2'>
			<div className='flex flex-col w-11/12 gap-4 justify-between items-center py-2 md:py-0 lg:flex-row'>
				<h1 className='font-title text-center text-4xl/none py-8 md:text-5xl uppercase'>
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
			<div className='flex flex-col gap-5 p-6 lg:p-8'>
				<h2 className='font-jolly-lodger text-3xl tracking-wider'>Selecciona un año</h2>
				<div className='flex flex-col gap-4'>
					{yearsList.map(year => (
						<CardButton
							key={year}
							onClick={() => setYear(year)}
							text={year}
						/>
					))}
				</div>
			</div>
		</section>
	)
})
