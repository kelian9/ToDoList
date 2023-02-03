import { cy, describe, it } from "local-cypress";

const generateResponse = ({ total }: { page: number, total: number }) => ({
    status: 'ok',
    totalResults: total,
    articles: Array.from(Array(5).keys())
        .map((id) => ({
            source: {
                id: id,
                name: 'Google News',
            },
            author: null,
            title: 'Title' + id,
            description: '',
            url: 'https://ya.ru/',
            urlToImage: '',
            publishedAt: '2023-02-03T00:18:00Z',
            content: null,
        }))
});

const regRequest = (alias: string, page: number = 1) => {
	cy.intercept(
		"GET",
		`/v2/top-headlines?country=ru&page=1&pageSize=5`,
		generateResponse({ page, total: 30 })
	).as(alias);
}

describe('NewsTicker', () => {
	it('check articles rendering', () => {
		// Initial Getting
		regRequest('getArticles');
		cy.visit('home');
		cy.getByTestId('settings')
			.should('be.visible')
			.click();
		cy.getByTestId('news-toggle')
			.should('be.visible')
			.click();
		cy.wait('@getArticles');
		[0, 1].forEach((id) => {
			cy.getByTestId(`article-title-${id}`).should('be.visible');
		});
	});
});
