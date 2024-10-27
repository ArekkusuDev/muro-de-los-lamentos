import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@/': '/src',
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
					'game-core': ['@p5-wrapper/react', 'p5']
				}
			}
		}
	}
})
