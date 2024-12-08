import { showSuccessToast, showErrorToast } from "../utility.js";

const TFusername = document.getElementById("username");
const TFpassword = document.getElementById("password");
const toRegis = document.getElementById("toRegis");

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

toRegis.addEventListener("click", function () {
	history.back();
});

const login = document.querySelector("#login");

login.addEventListener("click", function (e) {
	e.preventDefault();
	const username = TFusername.value;
	const password = TFpassword.value;

	if (username === "" || password === "") {
		showErrorToast("All Field must be filled", 1500, () => {});
		return;
	}

	const users = JSON.parse(localStorage.getItem("users"));

	if (users == null) {
		showErrorToast("No Data Registered Yet!", 1500, () => {});
		return;
	}
	var isLoginSuccess = -1;
	var isUserExist = false;
	users.forEach((user, index) => {
		if (user.username === username) {
			isUserExist = true;
			if (user.password === password) {
				isLoginSuccess = index;
			}
		}
	});

	if (!isUserExist) {
		showErrorToast("User doesn't Exist", 1500, () => {});
		return;
	}

	if (isUserExist && isLoginSuccess == -1) {
		showErrorToast("Wrong Password!", 1500, () => {});
		return;
	}

	if (isLoginSuccess != -1) {
		sessionStorage.setItem(
			"loggedInUser",
			JSON.stringify(users[isLoginSuccess])
		);
		showSuccessToast("Login Successfull!", 1500, () => {});
		setTimeout(goToDashbord, 1500);
		return;
	}
});

function goToDashbord() {
	window.location.href = "../html/dashboardPage.html";
}
