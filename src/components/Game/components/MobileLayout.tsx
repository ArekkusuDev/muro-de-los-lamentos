import { Student } from '@/types/api'
import { memo } from 'react'
import { ExitButton } from './ExitButton'
import { StudentCard } from './StudentCard'

const MobileLayout = memo(function MobileLayout({ students }: { students: Student[] }) {
	return (
		<div className='flex flex-col items-center gap-8 mb-20'>
			<div className='pt-8'>
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
