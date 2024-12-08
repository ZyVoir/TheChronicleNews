import {
	showSuccessToast,
	showErrorToast,
	containsSpecialChar,
	containsNumber,
} from "../utility.js";

import { User } from "../model/user.js";

const toLogin = document.getElementById("toLogin");

toLogin.addEventListener("click", function () {
	goToLogin();
});

const TFname = document.getElementById("name");
const TFusername = document.getElementById("username");
const TFpassword = document.getElementById("password");

const passwordIcon = document.getElementById("passwordIcon");
passwordIcon.addEventListener("click", function () {
	if (passwordIcon.classList.contains("fa-eye")) {
		passwordIcon.classList.remove("fa-eye");
		passwordIcon.classList.add("fa-eye-slash");
		TFpassword.type = "text";
	} else {
		passwordIcon.classList.remove("fa-eye-slash");
		passwordIcon.classList.add("fa-eye");
		TFpassword.type = "password";
	}
});

const register = document.querySelector("#register");

register.addEventListener("click", function (e) {
	e.preventDefault();
	const name = TFname.value;
	const username = TFusername.value;
	const password = TFpassword.value;

	if (validateRegister(name, username, password)) {
		const newUser = new User(name, username, password, 0);
		const users = JSON.parse(localStorage.getItem("users"));

		if (users == null) {
			const newUsers = [newUser];
			localStorage.setItem("users", JSON.stringify(newUsers));
		} else {
			users.push(newUser);
			localStorage.setItem("users", JSON.stringify(users));
		}
		TFname.value = "";
		TFusername.value = "";
		showSuccessToast("Register Successfull", 1500, () => {});
		setTimeout(goToLogin, 1500);
	}
});

function goToLogin() {
	window.location.href = "../html/loginPage.html";
}

function validateRegister(name, username, password) {
	if (name === "" || username === "" || password === "") {
		showErrorToast("All Field must be filled", 1500, () => {});
		return false;
	}

	if (name.length < 6) {
		showErrorToast("Name must be at least 6 characters", 1500, () => {});
		return false;
	}

	if (containsSpecialChar(name) || containsNumber(name)) {
		showErrorToast(
			"Name cannot contain special characters and number",
			1500,
			() => {}
		);
		return false;
	}
	if (username.length < 4) {
		showErrorToast("Username must be at least 4 characters", 1500, () => {});
		return false;
	}
	if (containsSpecialChar(username)) {
		showErrorToast(
			"Username cannot contain special characters and number",
			1500,
			() => {}
		);
		return false;
	}

	const users = JSON.parse(localStorage.getItem("users"));
	if (users != null) {
		var isExist = false;
		users.forEach((user) => {
			if (user.username === username) {
				showErrorToast("Username already exist", 1500, () => {});
				isExist = true;
			}
		});
		if (isExist) return false;
	}

	if (password.length < 7) {
		showErrorToast("Password must be at least 7 characters", 1500, () => {});
		return false;
	}
	return true;
}
