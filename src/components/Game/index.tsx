import { useGameContext } from '@/hooks/useGameContext'
import { Api } from '@/lib/api'
import type { Year } from '@/types/api'
import { lazy, useEffect, useState } from 'react'

const Sketch = lazy(() => import('./components/Sketch'))
const YearsMenu = lazy(() => import('./components/YearsMenu'))

export default function Game() {
	const { year } = useGameContext()
	const [yearsList, setYearList] = useState<Year[]>([])

	useEffect(() => {
		const loadYears = async () => {
			try {
				const years = await Api.getYearsList()
				setYearList(years)
			} catch (error) {
				console.error(`Error loading years: ${error}`)
			}
		}

		loadYears()
	}, [])

	return <>{year ? <Sketch year={year} /> : <YearsMenu yearsList={yearsList} />}</>
}
