import type { Student } from '@/types/api'

export function StudentCard({ student }: { student: Student }) {
	return (
		<div className='relative flex items-center max-w-sm bg-base rounded-lg overflow-hidden my-4 text-xl min-w-80 tracking-wider'>
			<div className='p-4'>
				<h1 className='text-3xl mb-2'>{student.name}</h1>
				<p>Apellidos: {student.lastnames}</p>
				<p>Matrícula: {student.student_id}</p>
				<p>Grupo: {student.student_id}</p>
				<p>Email: {student.email}</p>
			</div>
			<span className='absolute top-0 right-0 text-md me-2 px-3 py-1 rounded-b-md bg-yellow-900 text-yellow-300'>
				Muerto
			</span>
		</div>
	)
}
