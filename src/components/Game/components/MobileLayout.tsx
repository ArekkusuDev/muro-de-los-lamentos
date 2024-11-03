import { memo } from 'react'
import { ExitButton } from './ExitButton'
import { StudentCard } from './StudentCard'
import { useStudents } from '@/hooks/useStudents'
import { Year } from '@/types/api'

const MobileLayout = memo(function MobileLayout({ year }: { year: Year }) {
	const students = useStudents(year)

	return (
		<div className='flex flex-col items-center gap-8 mb-20'>
			<div>
				<ExitButton />
			</div>

			<div className='grid md:grid-cols-2 w-full place-items-center px-4'>
				{students.map(student => (
					<StudentCard
						key={student.student_id}
						student={student}
					/>
				))}
			</div>
		</div>
	)
})

export default MobileLayout
