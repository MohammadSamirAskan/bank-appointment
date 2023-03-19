/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
				appGray: "#d4d4d4",
				thirdGray: "#faf9fb",
				appRed: "#DC2626",
				appText: "#6b7280",
				appBase: "#171717",
			},
    },
  },
  plugins: [],
}
