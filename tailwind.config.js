/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app.{js,jsx,ts,tsx}"],
  content: ["./app/**"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
=======
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
>>>>>>> 597b610bb5813f5ef566735d2d782581562c5b8a
