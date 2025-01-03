import type { ButtonProps } from '@/types/components'

export function YearButton({ text, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className='font-creepster tracking-widest card-button relative overflow-hidden text-white border-2 border-white rounded-lg px-6 py-3 text-3xl transition duration-300 ease-in-out
      filter grayscale hover:grayscale-0'
		>
			<div className='absolute inset-0 bg-black opacity-70 hover:opacity-30 transition duration-300 ease-in-out'></div>
			<span className='relative z-10 text-shadow-sm'>{text}</span>
		</button>
	)
}
