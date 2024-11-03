import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		legacy({
			renderLegacyChunks: false
		})
	],
	resolve: {
		alias: {
			'@/': '/src',
			'@/config': '/src/config.ts',
			'@/components': '/src/components',
			'@/context': '/src/context',
			'@/database': '/src/database',
			'@/hooks': '/src/hooks',
			'@/lib': '/src/lib'
		}
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					'react-vendor': ['react', 'react-dom'],
					'p5-vendor': ['@p5-wrapper/react'],
					'game-core': ['/src/components/Game/sketch/game.ts']
				}
			}
		}
	},
	optimizeDeps: {
		include: ['p5']
	}
})
