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
		<section className='flex gap-4 w-11/12 justify-center text-wrap'>
			<aside className='flex w-full flex-col py-2 px-4 bg-gray-800 rounded-lg shadow-lg min-w-[200px]'>
				<h2 className='text-xl mb-4 text-purple-400 uppercase font-bold text-center'>
					Información del juego
				</h2>
				<div className='space-y-2'>
					<p className='flex justify-between'>
						<span className='font-bold'>Año:</span>
						{year && <span className='font-semibold'>{year}</span>}
					</p>
					<p className='flex justify-between'>
						<span className='font-bold'>Almas restantes:</span>
						{remainigStudents && (
							<span className='font-semibold text-orange-400'>{remainigStudents}</span>
						)}
					</p>
					<p className='flex justify-between'>
						<span className='font-bold'>Almas encontradas:</span>
						{foundStudents && <span className='font-semibold text-green-400'>{foundStudents}</span>}
					</p>
				</div>
			</aside>

			{children}
		</section>
	)
}
