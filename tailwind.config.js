/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app.{js,jsx,ts,tsx}',
		'./app/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#EA1588',
				secondary: '#2F3C7E',
			},
		},
	},
	plugins: [],
};
