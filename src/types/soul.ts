import type { Soul } from '@/components/Game/sketch/characters/soul'
import type { GameMap } from '@/components/Game/sketch/map/GameMap'
import type { Student } from '@/types/api'
import type { Image } from 'p5'

export type SoulProps = {
	id: string
	map: GameMap
	image: Image | null
}

export type SoulState = {
	soul: Soul
	student?: Student
	isLoading: boolean
	found?: boolean
}
