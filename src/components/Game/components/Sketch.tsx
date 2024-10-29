import { Api } from '@/lib/api'
import type { GameInfo, Student, Year } from '@/types'
import { ReactP5Wrapper } from '@p5-wrapper/react'
import { useEffect, useState } from 'react'
import { gameSketch } from '../sketch/game'

export function Sketch({ year }: { year: Year }) {
	const [students, setStudents] = useState<Student[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [gameInfo, setGameInfo] = useState<GameInfo>({
		remainigStudents: 0,
		foundStudents: 0,
	})

	useEffect(() => {
		const fetchStudents = async () => {
			setLoading(true)
			setError(null)

			try {
				const fetchedStudents = await Api.getStudentsByYear(year)
				setStudents(fetchedStudents)
				setGameInfo(prev => {
					return {
						...prev,
						remainigStudents: fetchedStudents.length
					}
				})
			} catch (error) {
				console.error(`Error fetching students: ${error}`)
				setError('Error al cargar los estudiantes desde la base de datos')
			} finally {
				setLoading(false)
			}
		}

		fetchStudents()
	}, [year])

	if (loading) return <div>Loading students...</div>

	if (error) return <div>{error}</div>

	return (
		<section className='flex gap-4 w-11/12 justify-center text-wrap'>
			<aside className='flex w-full flex-col py-2 px-4 bg-[#1e222a]'>
				<h2 className='uppercase font-bold text-center'>Información del juego</h2>
				<p>Año: {year}</p>
				<p>Almas restantes: {gameInfo.remainigStudents}</p>
				<p>Almas encontradas: {gameInfo.foundStudents}</p>
			</aside>

			<ReactP5Wrapper
				sketch={gameSketch}
				year={year}
				students={students}
				onUpdateGameInfo={(info: GameInfo) => setGameInfo(info)}
			/>
		</section>
	)
}
