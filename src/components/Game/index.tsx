import { useGameContext } from '@/hooks/useGameContext'
import { Api } from '@/lib/api'
import type { Year } from '@/types/api'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from '../LoadingSpinner'
import { Sketch } from './components/Sketch'
import { YearsMenu } from './components/YearsMenu'

export default function Game() {
	const { year } = useGameContext()
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

	return <>{year ? <Sketch year={year} /> : <YearsMenu yearsList={yearsList} />}</>
}
