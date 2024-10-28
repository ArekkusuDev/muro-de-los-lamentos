import { GameInstance } from '@/types'

export class GameMap {
	private tiles: number[][]
	private tileSize: number
	private grassCount = 0
	private worldSize = 2000
	private rows = 20
	private columns = 20

	constructor() {
		this.tileSize = this.worldSize / this.rows
		this.tiles = this.generateMap()
	}

	private generateMap() {
		const map: number[][] = []

		for (let i = 0; i < this.rows; i++) {
			const row: number[] = []

			for (let j = 0; j < this.columns; j++) {
				const tile = Math.random() > 0.3 ? 0 : 1
				if (tile === 1) this.grassCount++
				row.push(tile)
			}
			map.push(row)
		}

		return map
	}

	public getRandomPosition(p5: GameInstance, type: 1 | 0) {
		while (true) {
			const row = Math.floor(Math.random() * this.tiles.length)
			const col = Math.floor(Math.random() * this.tiles[0].length)

			if (this.tiles[row][col] === type) {
				return p5.createVector(
					col * this.tileSize + this.tileSize / 2,
					row * this.tileSize + this.tileSize / 2
				)
			}
		}
	}

	public getGrassCount() {
		return this.grassCount
	}

	public isGrass(x: number, y: number) {
		const row = Math.floor(y / this.tileSize)
		const col = Math.floor(x / this.tileSize)

		if (row < 0 || row >= this.tiles.length || col < 0 || col >= this.tiles[0].length) {
			return false
		}

		return this.tiles[row][col] === 1
	}

	public draw(p5: GameInstance) {
		for (let i = 0; i < this.tiles.length; i++) {
			for (let j = 0; j < this.tiles[i].length; j++) {
				const x = j * this.tileSize
				const y = i * this.tileSize

				if (this.tiles[i][j] === 0) {
					// Road
					p5.fill(100) // Gray
				} else {
					// Grass
					p5.fill(34, 139, 34) // Forest green
				}

				p5.noStroke()
				p5.rect(x, y, this.tileSize, this.tileSize)
			}
		}
	}
}
