import { useEffect, useState } from 'react'

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkIsMobile = () => {
			const userAgent = navigator.userAgent.toLowerCase()
			const mobileKeywords = [
				'android',
				'webos',
				'iphone',
				'ipad',
				'blackberry',
				'windows phone',
				'ipod'
			]

			setIsMobile(mobileKeywords.some(keyword => userAgent.includes(keyword)))
		}

		checkIsMobile()
		window.addEventListener('resize', checkIsMobile)

		return () => window.removeEventListener('resize', checkIsMobile)
	}, [])

	return isMobile
}
