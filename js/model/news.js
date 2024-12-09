class News {
	constructor(
		srcID,
		srcName,
		author,
		title,
		desc,
		url,
		urlImg,
		datePublished,
		content
	) {
		this.srcID = srcID;
		this.srcName = srcName;
		this.author = author;
		this.title = title;
		this.desc = desc;
		this.url = url;
		this.urlImg = urlImg;
		this.datePublished = datePublished;
		this.content = content;
	}
}

export { News };
