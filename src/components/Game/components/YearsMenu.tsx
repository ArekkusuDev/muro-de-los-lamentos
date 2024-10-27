import type { Year } from '@/types'

interface YearsMenuProps {
	yearsList: Year[]
	setYear: (year: Year | undefined) => void
}

export function YearsMenu({ yearsList, setYear }: YearsMenuProps) {
	return (
		<div className='flex flex-col gap-5 p-6 lg:p-8'>
			<h2 className='text-2xl font-semibold'>Selecciona un año</h2>
			<div className='flex flex-col gap-4'>
				{yearsList.map(year => (
					<button
						key={year}
						onClick={() => setYear(year)}
						className='py-2 px-4 text-xl font-medium'
					>
						{year}
					</button>
				))}
			</div>
		</div>
	)
}
