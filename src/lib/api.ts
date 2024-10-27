import type { Student, StudentsData, Year } from '@/types'

export class Api {
	private static async getData(): Promise<StudentsData> {
		const data = await import('@/database/data.json')

		return data.default
	}

	static async getStudentsByYear(year: Year): Promise<Student[]> {
		const data = await this.getData()

		return data[year] ?? []
	}

	static async getStudentByIndex(year: Year, index: number): Promise<Student> {
		const data = await this.getData()

		return data[year]?.[index]
	}

	static async getYearsList(): Promise<Year[]> {
		const data = await this.getData()

		return Object.keys(data) as Year[]
	}
}
