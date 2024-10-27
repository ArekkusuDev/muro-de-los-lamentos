import { useGameContext } from '@/hooks/useGameContext'
import { ButtonColored } from '@/components/ButtonColored'

export default function Home() {
	const { toggleGameStart } = useGameContext()

	return (
		<section className='flex flex-col h-screen items-center justify-center gap-8'>
			<h1 className='text-center mb-4 text-4xl font-extrabold lg:text-6xl uppercase'>
				El Muro de{' '}
				<span className='text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500'>
					Los Lamentos
				</span>
			</h1>

			<ButtonColored
				onClick={toggleGameStart}
				text='Ver las almas'
			/>
		</section>
	)
}
