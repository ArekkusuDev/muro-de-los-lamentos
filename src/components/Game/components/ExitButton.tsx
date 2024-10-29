import { Year } from '@/types/api'
import { ButtonColored } from '@/components/ButtonColored'

type ExitButtonProps = {
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
