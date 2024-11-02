import { useGameContext } from '@/hooks/useGameContext'
import { ButtonColored } from '@/components/ButtonColored'

export default function Home() {
	const { toggleGameStart } = useGameContext()

	return (
		<section className='flex flex-col min-h-[calc(100vh-4.5rem)] items-center justify-center gap-10'>
			<h1 className='font-title text-center text-5xl md:text-6xl px-4 md:px-0 uppercase'>
				El Muro de{' '}
				<span className='text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500'>
					Los Lamentos
				</span>
			</h1>

			<ButtonColored
				onClick={toggleGameStart}
				text='Visitar cementerio'
			/>
		</section>
	)
}
