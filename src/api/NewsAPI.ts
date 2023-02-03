import INewsResponse from '@models/responses/INewsResponse';
import IErrorResponse from '../models/responses/IErrorResponse';
import { AxiosResponse } from 'axios';
import axiosConfig from './axiosConfig';

class NewsAPI {
	public static getNews(page: number, pageSize = 5): Promise<AxiosResponse<INewsResponse, IErrorResponse>> {
		return axiosConfig.get('https://newsapi.org/v2/top-headlines', {
			headers: {
				'X-Api-Key': 'a79f3837264349948bd987e37d6d322d',
			},
			params: {
				country: 'ru',
				page,
				pageSize,
			},
		});
	}
}

export default NewsAPI;
