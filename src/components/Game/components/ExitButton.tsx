import { Year } from '@/types'
import { ButtonColored } from '@/components/ButtonColored'

interface ExitButtonProps {
	year: Year | undefined
	setYear: (year: Year | undefined) => void
	toggleGameStart: () => void
}

export function ExitButton({ year, setYear, toggleGameStart }: ExitButtonProps) {
	return (
		<>
			{year ? (
				<ButtonColored
					onClick={() => {
						setYear(undefined)
					}}
					text='Seleccionar otro año'
				/>
			) : (
				<ButtonColored
					onClick={toggleGameStart}
					text='Salir del juego'
				/>
			)}
		</>
	)
}
