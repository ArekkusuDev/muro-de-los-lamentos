import type { ButtonProps } from '@/types'

export function ButtonColored({ text, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className='text-white text-xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-800 shadow-lg shadow-red-800/80 font-medium rounded-lg px-5 py-2.5 text-center'
		>
			{text}
		</button>
	)
}
