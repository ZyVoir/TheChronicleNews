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
				circle5: "#4D7589",
				circle6: "#1D5D7D",
				circle7: "#3E4362",
				circle8: "#A83B3B",
				circle9: "#945218",
				circle10: "#9E8D54",
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
				fadeInDown: {
					"0%": {
						opacity: "0",
						transform: "translateY(-30px) scale(0.9)",
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
				fadeInDown: "fadeInDown 1s",
				fadeInUp2: "fadeInUp 1.5s",
			},
		},
	},
	plugins: [],
};
