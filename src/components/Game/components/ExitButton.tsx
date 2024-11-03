import { ButtonColored } from '@/components/ButtonColored'
import { useGameContext } from '@/hooks/useGameContext'

export function ExitButton() {
	const { year, toggleGameStart, setYear } = useGameContext()

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
