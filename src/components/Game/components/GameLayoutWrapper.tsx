import { useGameContext } from '@/hooks/useGameContext'
import { ReactNode } from 'react'
import { ExitButton } from './ExitButton'
import { Year } from '@/types/api'

type LayoutWrappperProps = {
	children: ReactNode
	year: Year
	remainigStudents?: number
	foundStudents?: number
}

export function GameLayoutWrapper({
	children,
	year,
	remainigStudents,
	foundStudents
}: LayoutWrappperProps) {
	const { setYear } = useGameContext()

	return (
		<section className='font-jolly-lodger flex min-h-[calc(100vh-4.5rem)] mx-auto pt-4 gap-4 text-2xl tracking-wider w-11/12'>
			<aside className='flex flex-col gap-6 w-full p-5 bg-gray-800 max-h-[37.5rem] rounded-lg shadow-lg'>
				<h2 className='font-creepster text-3xl text-purple-400 uppercase text-center'>
					Información del juego
				</h2>
				<div className='space-y-1'>
					<p className='flex justify-between'>
						<span>Año:</span>
						<span>{year}</span>
					</p>
					<p className='flex justify-between'>
						<span>Almas restantes:</span>
						<span className='text-orange-400'>{remainigStudents}</span>
					</p>
					<p className='flex justify-between'>
						<span>Almas encontradas:</span>
						<span className='text-green-400'>{foundStudents}</span>
					</p>
				</div>
				<ExitButton
					year={year}
					setYear={setYear}
				/>
			</aside>

			<div className='max-w-[1000px] max-h-[600px]'>{children}</div>
		</section>
	)
}
