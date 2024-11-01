import { useGameContext } from '@/hooks/useGameContext'
import { Api } from '@/lib/api'
import type { Year } from '@/types/api'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from '../LoadingSpinner'
import { ExitButton } from './components/ExitButton'
import { Sketch } from './components/Sketch'
import { YearsMenu } from './components/YearsMenu'

export default function Game() {
	const { year, setYear, toggleGameStart } = useGameContext()
	const [yearsList, setYearList] = useState<Year[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadYears = async () => {
			try {
				const years = await Api.getYearsList()
				setYearList(years)
			} catch (error) {
				console.error(`Error loading years: ${error}`)
			} finally {
				setLoading(false)
			}
		}

		loadYears()
	}, [])

	if (loading) return <LoadingSpinner />

	return (
		<section className='flex flex-col h-full items-center gap-2 py-2'>
			<header className='flex flex-col w-11/12 gap-8 justify-between items-center py-2 lg:flex-row'>
				<h1 className='font-title text-center mb-4 text-4xl lg:text-5xl uppercase'>
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
			</header>

			{year ? (
				<Sketch year={year} />
			) : (
				<YearsMenu
					yearsList={yearsList}
					setYear={setYear}
				/>
			)}
		</section>
	)
}
