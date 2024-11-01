import { Api } from '@/lib/api'
import type { Student, Year } from '@/types/api'
import { ReactP5Wrapper } from '@p5-wrapper/react'
import { useEffect, useState } from 'react'
import { gameSketch } from '../sketch/game'
import { GameLayoutWrapper } from './GameLayoutWrapper'
import { P5LoadingPlaceholder } from './P5LoadingPlaceholder'

export function Sketch({ year }: { year: Year }) {
	const [students, setStudents] = useState<Student[]>([])
	const [p5Loading, setP5Loading] = useState(true)
	const [gameInfo, setGameInfo] = useState({
		remainigStudents: students.length,
		foundStudents: 0
	})

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const fetchedStudents = await Api.getStudentsByYear(year)
				setStudents(fetchedStudents)
			} catch (error) {
				console.error(`Error fetching students: ${error}`)
			}
		}

		fetchStudents()
	}, [year])

	return (
		<GameLayoutWrapper
			year={year}
			remainigStudents={gameInfo.remainigStudents}
			foundStudents={gameInfo.foundStudents}
		>
			{p5Loading && <P5LoadingPlaceholder />}
			<ReactP5Wrapper
				sketch={gameSketch}
				year={year}
				students={students}
				onUpdateGameInfo={setGameInfo}
				onSetup={() => setP5Loading(false)}
			/>
		</GameLayoutWrapper>
	)
}
