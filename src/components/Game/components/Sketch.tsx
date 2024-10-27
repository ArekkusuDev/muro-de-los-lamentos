import { ReactP5Wrapper } from '@p5-wrapper/react'
import { gameSketch } from '../sketch/game'
import type { Year, Student } from '@/types'
import { Api } from '@/lib/api'
import { useEffect, useState } from 'react'

export function Sketch({ year }: { year: Year }) {
	const [students, setStudents] = useState<Student[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchStudents = async () => {
			setLoading(true)
			setError(null)

			try {
				const fetchedStudents = await Api.getStudentsByYear(year)
				setStudents(fetchedStudents)
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
		<section className='flex'>
			<aside className='flex flex-col py-2 px-4 bg-black text-lg font-semibold'>
				<h2>Información del juego</h2>
				<p>Año: {year}</p>
				<p>Estudiantes restantes:</p>
				<p>Estudiantes encontrados:</p>
			</aside>

			<ReactP5Wrapper
				sketch={gameSketch}
				year={year}
				students={students}
			/>

			<aside className='flex flex-col py-2 px-4 bg-black text-lg font-semibold'>
				<h2>Información del estudiante</h2>
				<p>Nombre:</p>
				<p>Semestre:</p>
				<p>Grupo:</p>
			</aside>
		</section>
	)
}
