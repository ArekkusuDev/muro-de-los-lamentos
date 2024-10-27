import type { ButtonProps } from '@/types'

export function CardButton({ text, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className='card-button relative overflow-hidden text-white border-2 border-white rounded-lg px-4 py-2 text-lg transition duration-300 ease-in-out
      filter grayscale hover:grayscale-0'
		>
			<div className='absolute inset-0 bg-black opacity-50 hover:opacity-0 transition duration-300 ease-in-out'></div>
			<span className='relative z-10 hover:text-orange-600 transition duration-300 ease-in-out'>
				{text}
			</span>
		</button>
	)
}
