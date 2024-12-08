function showToast(content, FAIcon, duration, color1, color2, onClick) {
	Toastify({
		node: (() => {
			const container = document.createElement("div");

			const icon = document.createElement("i");
			icon.className = FAIcon;
			icon.style.marginRight = "8px";

			const text = document.createElement("span");
			text.textContent = content;

			container.appendChild(icon);
			container.appendChild(text);

			return container;
		})(),
		duration: duration,
		newWindow: true,
		close: false,
		gravity: "bottom",
		position: "right",
		stopOnFocus: true,
		style: {
			background: `linear-gradient(to right, #${color1}, #${color2})`,
			borderRadius: "10px",
			padding: "12px",
			color: "white", // Ensures text is visible on background
		},
		onClick: onClick, // Callback after click
	}).showToast();
}

function showSuccessToast(content, duration, onClick) {
	showToast(
		content,
		"fas fa-check-circle",
		duration,
		"00b09b",
		"96c93d",
		onClick
	);
}

function showErrorToast(content, duration, onClick) {
	showToast(
		content,
		"fa-solid fa-circle-xmark",
		duration,
		"ff0000",
		"ff4d4d",
		onClick
	);
}

function containsSpecialChar(str) {
	const regex = /[!@#$%^&*(),.?":{}|<>]/;
	return regex.test(str);
}

function containsNumber(str) {
	const regex = /\d/;
	return regex.test(str);
}

export {
	showSuccessToast,
	showErrorToast,
	containsSpecialChar,
	containsNumber,
};
