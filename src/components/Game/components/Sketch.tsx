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
		foundStudents: 0
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
			<aside className='flex w-full flex-col py-2 px-4 bg-gray-800 rounded-lg shadow-lg min-w-[200px]'>
				<h2 className='text-xl mb-4 text-purple-400 uppercase font-bold text-center'>
					Información del juego
				</h2>
				<div className='space-y-2'>
					<p className='flex justify-between'>
						<span className='font-bold'>Año:</span>
						<span className='font-semibold'>{year}</span>
					</p>
					<p className='flex justify-between'>
						<span className='font-bold'>Almas restantes:</span>
						<span className='font-semibold text-orange-400'>{gameInfo.remainigStudents}</span>
					</p>
					<p className='flex justify-between'>
						<span className='font-bold'>Almas encontradas:</span>
						<span className='font-semibold text-green-400'>{gameInfo.foundStudents}</span>
					</p>
				</div>
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
