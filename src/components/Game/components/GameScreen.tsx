import { useIsMobile } from '@/hooks/useIsMobile'
import { Api } from '@/lib/api'
import { Student, Year } from '@/types/api'
import { lazy, useEffect, useState } from 'react'

const MobileGameLayout = lazy(() => import('./MobileLayout'))
const BrowserLayout = lazy(() => import('./BrowserLayout'))

export default function GameScreen({ year }: { year: Year }) {
	const [students, setStudents] = useState<Student[]>([])
	const [fetchingStudents, setFetchingStudents] = useState(true)
	const isMobile = useIsMobile()

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const fetchedStudents = await Api.getStudentsByYear(year)
				setStudents(fetchedStudents)
			} catch (error) {
				console.error(`Error fetching students: ${error}`)
			} finally {
				setFetchingStudents(false)
			}
		}

		fetchStudents()
	}, [year])

	if (fetchingStudents) {
		return <div className='min-h-[calc(100vh-4.5rem)]'></div>
	}

	if (isMobile) {
		return (
			<section className='font-jolly-lodger flex flex-col min-h-[calc(100vh-4.5rem)] pt-4'>
				<MobileGameLayout students={students} />
			</section>
		)
	}

	return (
		<section className='font-jolly-lodger flex flex-col min-h-[calc(100vh-4.5rem)] pt-4'>
			<BrowserLayout
				year={year}
				students={students}
			/>
		</section>
	)
}
