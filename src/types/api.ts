export type Student = {
	name: string
	lastnames: string
	student_id: string
	email: string
	group: string
	code: string[] | string
	signup_date: string
}

// add more years if needed (i hope)
export type Year = '2024'

export type StudentsData = Record<Year, Student[]>
