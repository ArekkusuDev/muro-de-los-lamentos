import { Api } from '@/lib/api'
import type { Student, Year } from '@/types/api'
import type { GameInfo } from '@/types/game'
import { ReactP5Wrapper } from '@p5-wrapper/react'
import { useEffect, useState } from 'react'
import { gameSketch } from '../sketch/game'
import { GameLayoutWrapper } from './GameLayoutWrapper'
import { P5LoadingPlaceholder } from './P5LoadingPlaceholder'

export function Sketch({ year }: { year: Year }) {
	const [students, setStudents] = useState<Student[]>([])
	const [loading, setLoading] = useState(true)
	const [p5Loading, setP5Loading] = useState(true)
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

	const handleSketchSetup = () => {
		setP5Loading(false)
	}

	if (error)
		return (
			<GameLayoutWrapper>
				<div className='flex items-center justify-center w-full h-[600px] bg-gray-800 rounded-lg'>
					<p className='text-red-500 text-xl'>{error}</p>
				</div>
			</GameLayoutWrapper>
		)

	return (
		<GameLayoutWrapper
			year={year}
			remainigStudents={gameInfo.remainigStudents}
			foundStudents={gameInfo.foundStudents}
		>
			{(p5Loading || loading) && <P5LoadingPlaceholder />}
			<ReactP5Wrapper
				sketch={gameSketch}
				year={year}
				students={students}
				onUpdateGameInfo={(info: GameInfo) => setGameInfo(info)}
				onSetup={handleSketchSetup}
			/>
		</GameLayoutWrapper>
	)
}
