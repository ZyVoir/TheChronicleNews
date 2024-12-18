import { News } from "../model/news.js";
import { showWarningToast, scrollToTop, showErrorToast } from "../utility.js";

if (!sessionStorage.getItem("loggedInUser")) {
	window.location.href = "../html/index.html";
}

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

const loadingHeadlineSpinner = document.getElementById("loadingHeadline");
const loadingHeadlineErrorText = document.getElementById(
	"loadingHeadlineError"
);
const headlineUL = document.getElementById("headlineList");

const loadingSpinner = document.getElementById("loading");
const loadingErrorText = document.getElementById("loadingError");
const newsUL = document.getElementById("newsList");

const btnFirstPage = document.getElementById("toFirstPage");
const btnPrevPage = document.getElementById("toPreviousPage");
const lblPageIndex = document.getElementById("pageIndex");
const btnNextPage = document.getElementById("toNextPage");
const btnLastPage = document.getElementById("toLastPage");

var headlineNews = [];
var news = [];
var currentPage = 1;
var totalPage;

btnFirstPage.addEventListener("click", function () {
	if (currentPage != 1) {
		scrollToTop();
		currentPage = 1;
		setListOfNews(currentPage);
	} else {
		showWarningToast("Already in the first Page", 1500, () => {});
	}
});

btnLastPage.addEventListener("click", function () {
	if (currentPage != totalPage) {
		scrollToTop();
		currentPage = totalPage;
		setListOfNews(currentPage);
	} else {
		showWarningToast("Already in the last Page", 1500, () => {});
	}
});

btnNextPage.addEventListener("click", function () {
	if (currentPage + 1 <= totalPage) {
		scrollToTop();
		currentPage += 1;
		setListOfNews(currentPage);
	} else {
		showWarningToast("Already in the last Page", 1500, () => {});
	}
});

btnPrevPage.addEventListener("click", function () {
	if (currentPage - 1 >= 1) {
		scrollToTop();
		currentPage -= 1;
		setListOfNews(currentPage);
	} else {
		showWarningToast("Already in the first Page", 1500, () => {});
	}
});

var user = initLoginCredential();
fetchHeadlineAPI();
fetchNewsAPI();

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
	sessionStorage.clear();
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
	currentPage = 1;
});

BtnSearch.addEventListener("click", function () {
	if (TFSearchQuery.value !== "") {
		currentPage = 1;
		scrollToTop();
		fetchNewsAPI();
	} else {
		showErrorToast("You cant search for nothing!", 1500, () => {});
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
	const isRead = sessionStorage.getItem("isRead");

	if (isRead != null) {
		if (isRead) {
			// Update GridReadCount and Possibly the GridOutLook
			const users = JSON.parse(localStorage.getItem("users"));
			users.forEach((item) => {
				if (item.username === user.username) {
					item.readCount += 1;
					user = item;
					sessionStorage.setItem("loggedInUser", JSON.stringify(user));
				}
			});
			gridReadCount.innerText = `You have read ${user.readCount} news`;
			localStorage.setItem("users", JSON.stringify(users));
			sessionStorage.removeItem("isRead");
		}
	}
}

function fetchHeadlineAPI() {
	headlineNews.length = 0;
	headlineUL.innerHTML = "";
	headlineUL.innerText = "";
	headlineUL.classList.add("hidden");
	const API =
		"https://newsapi.org/v2/top-headlines?apiKey=6fdb6bd0c70c43998d61f046fd3dab5a&language=en";
	fetch(API)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			if (data.status != "ok") {
				loadingHeadlineSpinner.add("hidden");
				loadingHeadlineErrorText.remove("hidden");
			} else {
				data.articles.forEach((item) => {
					const srcID = item.source.id;
					const srcName = item.source.name;
					const author = item.author;
					const title = item.title;
					const desc = item.description;
					const url = item.url;
					const urlImg = item.urlToImage;
					const datePublished = item.publishedAt;
					const content = item.content;

					const newNews = new News(
						srcID,
						srcName,
						author,
						title,
						desc,
						url,
						urlImg,
						datePublished,
						content
					);
					headlineNews.push(newNews);

					headlineUL.innerHTML += createInstanceOfHeadline(newNews);
				});

				headlineUL.querySelectorAll("li").forEach((item, index) => {
					item.addEventListener("click", function () {
						sessionStorage.setItem(
							"selectedNews",
							JSON.stringify(headlineNews[index])
						);
						window.location.href = "../html/detailPage.html";
					});
				});

				loadingHeadlineSpinner.classList.add("hidden");
				headlineUL.classList.remove("hidden");
			}
		})
		.catch((err) => {
			console.log(err);
			loadingHeadlineSpinner.classList.add("hidden");
			loadingHeadlineErrorText.classList.remove("hidden");
		});
}

function fetchNewsAPI() {
	const newsExampleQuery = [
		"Bitcoin",
		"Barack Obama",
		"Trump",
		"Indonesia",
		"Prabowo",
		"Apple Developer Academy",
		"Economy",
	];
	const randomSearch = Math.floor(Math.random() * newsExampleQuery.length);
	news.length = 0;
	if (TFSearchQuery.value == "") {
		TFSearchQuery.value = newsExampleQuery[randomSearch];
	}

	const API = `https://newsapi.org/v2/everything?q=${TFSearchQuery.value}&apiKey=6fdb6bd0c70c43998d61f046fd3dab5a&page=1`;

	fetch(API)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			if (data.status != "ok") {
				loadingSpinner.add("hidden");
				loadingErrorText.remove("hidden");
			} else {
				data.articles.forEach((item) => {
					const srcID = item.source.id;
					const srcName = item.source.name;
					const author = item.author;
					const title = item.title;
					const desc = item.description;
					const url = item.url;
					const urlImg = item.urlToImage;
					const datePublished = item.publishedAt;
					const content = item.content;

					const newNews = new News(
						srcID,
						srcName,
						author,
						title,
						desc,
						url,
						urlImg,
						datePublished,
						content
					);
					news.push(newNews);
				});

				setListOfNews(currentPage);
			}
		})
		.catch((err) => {
			console.log(err);
			loadingSpinner.classList.add("hidden");
			loadingErrorText.classList.remove("hidden");
		});
}

function setListOfNews(pageIndex) {
	var newsLength = news.length;
	var start = (pageIndex - 1) * 10;
	totalPage = Math.ceil(newsLength / 10);
	var end;
	if (newsLength != 0 && (totalPage > pageIndex || newsLength % 10 === 0)) {
		end = start + 10;
	} else {
		end = start + (newsLength % 10);
	}

	newsUL.innerHTML = "";
	newsUL.innerText = "";
	newsUL.classList.add("hidden");
	for (let i = start; i < end; i++) {
		newsUL.innerHTML += createInstanceOfNews(news[i]);
	}

	newsUL.querySelectorAll("li").forEach((item, index) => {
		item.addEventListener("click", function () {
			var idx = (currentPage - 1) * 10 + index;
			sessionStorage.setItem("selectedNews", JSON.stringify(news[idx]));
			window.location.href = "../html/detailPage.html";
		});
	});

	setBtnActive(btnFirstPage, pageIndex === 1 ? false : true);
	setBtnActive(btnPrevPage, pageIndex === 1 ? false : true);
	setBtnActive(btnNextPage, pageIndex == totalPage ? false : true);
	setBtnActive(btnLastPage, pageIndex == totalPage ? false : true);
	lblPageIndex.innerText = `${news.length == 0 ? 1 : currentPage}`;
	resultCount.innerText = `Total of ${
		news.length == 0 ? 0 : news.length
	} result(s)`;

	if (news.length == 0) {
		loadingErrorText.innerText = "No news related";
		loadingErrorText.classList.remove("hidden");
	} else {
		loadingErrorText.innerText = "Error in showing result";
		loadingErrorText.classList.add("hidden");
	}
	resultCount.classList.remove("hidden");
	loadingSpinner.classList.add("hidden");
	newsUL.classList.remove("hidden");
}

function createInstanceOfHeadline(news) {
	return `<li
					class="flex flex-col gap-[10px] p-[15px] containerPrimary w-fit h-[210px] sm:h-[240px] md:h-[310px] lg:h-[370px] animate-fadeInDown mb-[25px] justify-start"
				>
					<img src="${
						news.urlImg == null ? "" : news.urlImg
					}" alt="No Image Provided" class="aspect-video w-[150px] md:w-[200px] lg:w-[300px] h-auto ${
		news.urlImg == null ? "bg-white" : ""
	} rounded-md"></img>
					<h2 class="line-clamp-5 w-[150px] md:w-[200px] lg:w-[300px] h-fit text-justify text-white text-[11px] sm:text-[14px] md:text-[20px]">${
						news.title
					}</h2>
				</li>`;
}

function createInstanceOfNews(news) {
	return `<li class="animate-fadeInUp2 w-full h-fit containerPrimary">
					<div
						class="flex flex-col sm:flex-row gap-[35px] px-[32px] py-[26px] w-full h-full"
					>
						<img
							src="${news.urlImg == null ? "" : news.urlImg}"
							class="w-full sm:w-[50%] sm:max-w-[50%] aspect-video object-cover rounded-md ${
								news.urlImg == null ? "bg-white" : ""
							}"
							alt="No Image Provided"
						/>
						<div
							class="flex flex-col gap-[16px] sm:justify-start items-start sm:max-w-[50%]"
						>
							<h2 class="text-white font-medium text-[16px] sm:text-[20px] text-justify">
								${news.title}
							</h2>
							<h5 class="text-white text-[11px] sm:text-[15px] opacity-65 text-justify">
								${news.desc == null ? "No Description Provided" : news.desc}
							</h5>
							<h5 class="text-white text-[11px] sm:text-[15px] opacity-65 text-justify">
								${news.datePublished.replace(/[ZT]/g, " ")}
							</h5>
						</div>
					</div>
				</li>`;
}

function setBtnActive(btn, isActive) {
	if (isActive) {
		btn.classList.add("hover:bg-white");
		btn.classList.add("hover:text-blue-500");
		btn.classList.remove("text-opacity-20");
		btn.classList.remove("border-opacity-20");
	} else {
		btn.classList.remove("hover:bg-white");
		btn.classList.remove("hover:text-blue-500");
		btn.classList.add("text-opacity-20");
		btn.classList.add("border-opacity-20");
	}
}
