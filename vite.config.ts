import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		legacy({
			targets: ['defaults', 'not IE 11']
		})
	],
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
					'p5-core': ['p5', '@p5-wrapper/react']
				}
			}
		}
	}
})
