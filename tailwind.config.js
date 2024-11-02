const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				title: ['"Henny Penny"', ...fontFamily.sans],
				creepster: ['Creepster', ...fontFamily.sans],
				'jolly-lodger': ['"Jolly Lodger"', ...fontFamily.sans],
				body: ['"Space Grotesk"', ...fontFamily.sans]
			},
			textShadow: {
				sm: '0 1px 2px rgba(0, 0, 0, 0.8)',
				DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.8)',
				lg: '0 8px 16px rgba(0, 0, 0, 0.8)'
			}
		}
	},
	plugins: [
		function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					'text-shadow': value => ({
						textShadow: value
					})
				},
				{ values: theme('textShadow') }
			)
		}
	]
}
