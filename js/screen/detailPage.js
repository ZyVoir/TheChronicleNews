if (!sessionStorage.getItem("loggedInUser")) {
	window.location.href = "../html/index.html";
}

const btnExit = document.getElementById("exit");
const selectedNews = JSON.parse(sessionStorage.getItem("selectedNews"));

const newsImg = document.getElementById("newsImg");
const newsTitle = document.getElementById("newsTitle");
const newsDesc = document.getElementById("newsDesc");
const newsURLButton = document.getElementById("newsURLButton");
const newsSrc = document.getElementById("newsSrc");
const newsAuthor = document.getElementById("newsAuthor");
const newsDate = document.getElementById("newsDate");
const newsContent = document.getElementById("newsContent");

document.addEventListener("DOMContentLoaded", () => {
	newsImg.src = selectedNews.urlImg == null ? "" : selectedNews.urlImg;
	newsTitle.innerText =
		selectedNews.title == null ? "No Title Provided" : selectedNews.title;
	newsDesc.innerText =
		selectedNews.desc == null ? "No Description Provided" : selectedNews.desc;
	newsSrc.innerText = `Source - [${
		selectedNews.srcID == null ? "Unknown" : selectedNews.srcID
	}] : [${selectedNews.srcName == null ? "Unknown" : selectedNews.srcName}]`;
	newsAuthor.innerText = `Author : [${
		selectedNews.author == null ? "No Name" : selectedNews.author
	}]`;
	newsDate.innerText =
		selectedNews.datePublished == null
			? "No Date Specified"
			: selectedNews.datePublished.replace(/[ZT]/g, " ");
	newsContent.innerText =
		selectedNews.content == null ? "No Content Provided" : selectedNews.content;

	sessionStorage.setItem("isRead", true);

	newsURLButton.onclick = function () {
		if (selectedNews.url != null) {
			window.open(selectedNews.url, "_blank");
		}
	};
});

btnExit.addEventListener("click", function () {
	history.back();
});
