import { ReactP5Wrapper } from '@p5-wrapper/react'
import { gameSketch } from '../sketch/game'
import type { Year } from '@/types'
import { Api } from '@/lib/api'
import { useMemo } from 'react'

export function Sketch({ year }: { year: Year }) {
	const students = useMemo(() => Api.getStudentsByYear(year), [year])

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
