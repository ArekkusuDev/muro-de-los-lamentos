import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GameContextProvider } from '@/context/GameContextProvider.tsx'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')

createRoot(root!).render(
	<StrictMode>
		<GameContextProvider>
			<App />
		</GameContextProvider>
	</StrictMode>
)
