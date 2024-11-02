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
			colors: {
				// https://github.com/Catppuccin/Catppuccin
				text: '#CDD6F4',
				'overlay-2': '#9399B2',
				base: '#1E1E2E',
				crust: '#11111B'
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
