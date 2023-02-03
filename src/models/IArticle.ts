interface IArticle {
	source: {
		id: number | null,
		name: string,
	},
	author: string,
	title: string,
	description: string,
	url: string,
	urlToImage: string,
	publishedAt: string | Date,
	content: string,
}

export default IArticle;
