import data from '@/database/data.json'
import type { Student, StudentsData, Year } from '@/types'

const typedData = data as StudentsData

export class Api {
	static getStudentsByYear(year: Year): Student[] {
		return typedData[year] ?? []
	}

	static getStudentByIndex(year: Year, index: number): Student {
		return typedData[year]?.[index]
	}

	static getYearsList(): Year[] {
		return Object.keys(typedData) as Year[]
	}
}
