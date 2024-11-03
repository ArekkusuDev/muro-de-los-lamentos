import { Api } from '@/lib/api'
import { Student, Year } from '@/types/api'
import { useEffect, useState } from 'react'

export function useStudents(year: Year) {
	const [students, setStudents] = useState<Student[]>([])

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

	return students
}
