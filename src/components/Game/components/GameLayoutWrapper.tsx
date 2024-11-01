import { ReactNode } from 'react'

type LayoutWrappperProps = {
	children: ReactNode
	year?: string
	remainigStudents?: number
	foundStudents?: number
}

export function GameLayoutWrapper({
	children,
	year,
	remainigStudents,
	foundStudents
}: LayoutWrappperProps) {
	return (
		<section className='font-jolly-lodger gap-4 text-2xl tracking-wider flex w-11/12 justify-center text-wrap'>
			<aside className='flex flex-col gap-4 w-full p-5 bg-gray-800 rounded-lg shadow-lg min-w-[200px]'>
				<h2 className='font-creepster text-3xl mb-4 text-purple-400 uppercase font-bold text-center'>
					Información del juego
				</h2>
				<div className='space-y-2'>
					<p className='flex justify-between'>
						<span className='font-bold'>Año:</span>
						<span className='font-semibold'>{year}</span>
					</p>
					<p className='flex justify-between'>
						<span className='font-bold'>Almas restantes:</span>
						<span className='font-semibold text-orange-400'>{remainigStudents}</span>
					</p>
					<p className='flex justify-between'>
						<span className='font-bold'>Almas encontradas:</span>
						<span className='font-semibold text-green-400'>{foundStudents}</span>
					</p>
				</div>
			</aside>

			{children}
		</section>
	)
}
