import { useStudents } from '@/hooks/useStudents'
import { Year } from '@/types/api'
import { lazy, useState } from 'react'
import { ExitButton } from './ExitButton'

const GameCanvas = lazy(() => import('./GameCanvas'))

export default function BrowserLayout({ year }: { year: Year }) {
	const students = useStudents(year)
	const [gameInfo, setGameInfo] = useState({
		remainigStudents: 0,
		foundStudents: 0
	})

	return (
		<div className='flex mx-auto gap-4 text-2xl tracking-wider w-11/12'>
			<aside className='flex flex-col gap-6 w-full p-5 bg-base max-h-[37.5rem] rounded-lg shadow-lg'>
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
						<span className='text-orange-400'>{gameInfo.remainigStudents}</span>
					</p>
					<p className='flex justify-between'>
						<span>Almas encontradas:</span>
						<span className='text-green-400'>{gameInfo.foundStudents}</span>
					</p>
				</div>
				<ExitButton />
			</aside>

			<GameCanvas
				year={year}
				students={students}
				onUpdateGameInfo={setGameInfo}
			/>
		</div>
	)
}
