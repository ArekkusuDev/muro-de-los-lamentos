import { Year } from '@/types'
import { Button } from '@/components/ButtonColored'

interface ExitButtonProps {
	year: Year | undefined
	setYear: (year: Year | undefined) => void
	toggleGameStart: () => void
}

export function ExitButton({ year, setYear, toggleGameStart }: ExitButtonProps) {
	return (
		<>
			{year ? (
				<Button
					onClick={() => {
						setYear(undefined)
					}}
					text='Seleccionar otro año'
				/>
			) : (
				<Button
					onClick={toggleGameStart}
					text='Salir del juego'
				/>
			)}
		</>
	)
}
