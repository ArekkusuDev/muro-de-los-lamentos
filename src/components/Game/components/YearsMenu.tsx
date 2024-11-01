import type { Year } from '@/types/api'
import { CardButton } from './CardButton'
import { memo } from 'react'

interface YearsMenuProps {
	yearsList: Year[]
	setYear: (year: Year | undefined) => void
}

export const YearsMenu = memo(function YearsMenu({ yearsList, setYear }: YearsMenuProps) {
	return (
		<div className='flex flex-col gap-5 p-6 lg:p-8'>
			<h2 className='font-jolly-lodger text-3xl tracking-wider'>Selecciona un año</h2>
			<div className='flex flex-col gap-4'>
				{yearsList.map(year => (
					<CardButton
						key={year}
						onClick={() => setYear(year)}
						text={year}
					/>
				))}
			</div>
		</div>
	)
})
