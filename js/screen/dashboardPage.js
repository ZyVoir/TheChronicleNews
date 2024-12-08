const user = initLoginCredential();

const headerName = document.getElementById("headerName");
const logOut = document.getElementById("logOut");
const gridName = document.getElementById("gridName");
const gridUsername = document.getElementById("gridUsername");
const gridReadCount = document.getElementById("gridReadCount");
const gridOutlook = document.getElementById("gridOutlook");
const TFSearchQuery = document.getElementById("searchQuery");
const cancelSearch = document.getElementById("cancelSearch");
const BtnSearch = document.getElementById("search");
const linkedIn = document.getElementById("linkedIn");
const gitHub = document.getElementById("gitHub");
const instagram = document.getElementById("instagram");
const resultCount = document.getElementById("resultCount");

window.addEventListener("load", function () {
	checkIsUpdateReadCount();
});

linkedIn.addEventListener("click", function () {
	window.open("www.linkedin.com/in/william-whcs", "_blank");
});

gitHub.addEventListener("click", function () {
	window.open("https://github.com/ZyVoir", "_blank");
});

instagram.addEventListener("click", function () {
	window.open("https://www.instagram.com/wllyc.04_", "_blank");
});

logOut.addEventListener("click", function () {
	history.back();
});

TFSearchQuery.addEventListener("input", function () {
	if (this.value.length == 0) {
		cancelSearch.classList.add("hidden");
	} else {
		cancelSearch.classList.remove("hidden");
	}
});

TFSearchQuery.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		TFSearchQuery.blur();
	}
});

cancelSearch.addEventListener("click", function () {
	TFSearchQuery.value = "";
	this.classList.add("hidden");
});

BtnSearch.addEventListener("click", function () {
	if (TFSearchQuery.value === "") {
		// Do API call for todays headline
	} else {
		// DO API call for the search query
	}
});

document.addEventListener("DOMContentLoaded", () => {
	headerName.innerText = `Welcome, ${user.name}`;
	gridName.innerText = user.name;
	gridUsername.innerText = user.username;
	gridReadCount.innerText = `You have read ${user.readCount} news`;
	gridOutlook.innerText = outLookText(user.readCount);
});

function initLoginCredential() {
	return JSON.parse(sessionStorage.getItem("loggedInUser"));
}

function outLookText(readCount) {
	if (readCount == 0) {
		return "You haven't read anything...";
	} else if (readCount < 10) {
		return "You need some news to read";
	} else {
		return "Keep up your reading habits!";
	}
}

function checkIsUpdateReadCount() {
	console.log("test");
	const isRead = sessionStorage.getItem("isRead");

	if (isRead != null) {
		// Update GridReadCount and Possibly the GridOutLook
		console.log("Update");
	}
}
