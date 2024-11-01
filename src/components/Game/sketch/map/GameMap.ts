import { gameConfig } from '@/config'
import { GameInstance } from '@/types/game'
import p5 from 'p5'

export class GameMap {
	private tiles: number[][]
	private tileSize: number
	private tileCache: Map<string, p5.Graphics> = new Map()
	private static readonly TILE_TYPES = {
		ROAD: 0,
		GRASS: 1
	}
	private occupiedPositions: Set<string> = new Set()

	constructor() {
		this.tileSize = gameConfig.map.size / gameConfig.map.columns
		this.tiles = this.generateMap()
	}

	private createTileGraphic(p5: GameInstance, type: number) {
		const graphic = p5.createGraphics(this.tileSize, this.tileSize)

		if (type === GameMap.TILE_TYPES.ROAD) {
			graphic.fill(100)
		} else {
			graphic.fill(34, 139, 34)
		}

		graphic.noStroke()
		graphic.rect(0, 0, this.tileSize, this.tileSize)

		return graphic
	}

	private getTileGraphic(p5: GameInstance, type: number) {
		const cacheKey = `tile_${type}`

		if (!this.tileCache.has(cacheKey)) {
			this.tileCache.set(cacheKey, this.createTileGraphic(p5, type))
		}

		return this.tileCache.get(cacheKey)
	}

	private generateMap() {
		const map: number[][] = []

		for (let i = 0; i < gameConfig.map.rows; i++) {
			const row: number[] = []

			for (let j = 0; j < gameConfig.map.columns; j++) {
				const tile = Math.random() > 0.3 ? GameMap.TILE_TYPES.ROAD : GameMap.TILE_TYPES.GRASS
				row.push(tile)
			}
			map.push(row)
		}

		return map
	}

	public isPositionOccupied(x: number, y: number) {
		return this.occupiedPositions.has(`${x},${y}`)
	}

	public occupyPosition(x: number, y: number) {
		this.occupiedPositions.add(`${x},${y}`)
	}

	public getRandomUnoccupiedPosition(p5: GameInstance, type: number) {
		let attempts = 0
		const maxAttempts = 100 // Prevent infinite loop

		while (attempts < maxAttempts) {
			const position = this.getRandomPosition(p5, type)
			const x = Math.floor(position.x / this.tileSize)
			const y = Math.floor(position.y / this.tileSize)

			if (!this.isPositionOccupied(x, y)) {
				this.occupyPosition(x, y)
				return position
			}

			attempts++
		}

		console.warn('Could not find unoccupied position after max attempts')
		return this.getRandomPosition(p5, type) // Fallback to random position
	}

	public getRandomPosition(p5: GameInstance, type: number) {
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

	public isGrass(x: number, y: number) {
		const row = Math.floor(y / this.tileSize)
		const col = Math.floor(x / this.tileSize)

		if (row < 0 || row >= this.tiles.length || col < 0 || col >= this.tiles[0].length) {
			return false
		}

		return this.tiles[row][col] === GameMap.TILE_TYPES.GRASS
	}

	public draw(p5: GameInstance, camera: { x: number; y: number }) {
		const startCol = Math.floor(camera.x / this.tileSize)
		const endCol = Math.ceil((camera.x + p5.width) / this.tileSize)
		const startRow = Math.floor(camera.y / this.tileSize)
		const endRow = Math.ceil((camera.y + p5.height) / this.tileSize)

		for (let i = startRow; i < endRow; i++) {
			for (let j = startCol; j < endCol; j++) {
				if (i >= 0 && i < this.tiles.length && j >= 0 && j < this.tiles[0].length) {
					const x = j * this.tileSize
					const y = i * this.tileSize
					const tileType = this.tiles[i][j]
					const tileGraphic = this.getTileGraphic(p5, tileType)
					p5.image(tileGraphic!, x, y)
				}
			}
		}
	}
}
