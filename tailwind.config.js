/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./html/*.{html,js}"],
	theme: {
		extend: {
			fontFamily: {
				lexend: ["Lexend"],
			},
			backgroundColor: {
				primary: "#04060D",
				circle1: "#2D9FBF",
				circle2: "#00BBFF",
				circle3: "#798BFF",
				circle4: "#FFA05C",
			},
			keyframes: {
				circleMove: {
					"0%": {
						transform: "translate(0, 0)",
					},
					"25%": {
						transform: "translate(50px, 150px)",
					},
					"50%": {
						transform: "translate(150px, 50px)",
					},
					"100%": {
						transform: "translate(0, 0)",
					},
				},
				fadeInUp: {
					"0%": {
						opacity: "0",
						transform: "translateY(30px) scale(0.9)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0px) scale(1)",
					},
				},
			},
			animation: {
				circleMove: "circleMove 4s ease-in-out infinite",
				fadeInUp: "fadeInUp 1s",
			},
		},
	},
	plugins: [],
};
