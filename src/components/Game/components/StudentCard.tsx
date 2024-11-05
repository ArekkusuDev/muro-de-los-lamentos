import type { Student } from '@/types/api'

export function StudentCard({ student }: { student: Student }) {
	const isAlive = student.code.length === 3

	return (
		<div className='relative flex items-center max-w-sm bg-base rounded-lg overflow-hidden my-4 text-xl min-w-80 tracking-wider'>
			<div className='p-4'>
				<h1 className='text-3xl mb-2'>{student.name}</h1>
				<p>Apellidos: {student.lastnames}</p>
				<p>Matrícula: {student.student_id}</p>
				<p>Grupo: {student.group.toUpperCase()}</p>
				<p>Email: {student.email}</p>
			</div>
			<span
				className={`absolute text-center min-w-[71px] top-0 right-0 text-md me-2 px-3 py-1 rounded-b-md ${isAlive ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'}`}
			>
				{isAlive ? 'Vivo' : 'Muerto'}
			</span>
		</div>
	)
}
