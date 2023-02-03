import NewsAPI from '@api/NewsAPI';
import Directions from '@models/enums/Directions';
import MessageStatusEnum from '@models/enums/MessageStatusEnum';
import IArticle from '@models/IArticle';
import IErrorResponse from '@models/responses/IErrorResponse';
import { LinearProgress } from '@mui/material';
import Fade from '@mui/material/Fade';
import NewsTicker from '@ui/NewsTicker';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import MessagesContext from '../../../context/MessagesContext';
import styles from './style.module.scss';

const NewsFeed: React.FC = () => {
	const { sendMessage } = useContext(MessagesContext);
	const [pageState, setPageState] = useState<number>(1);
	const queryClient = useQueryClient();
	const { isLoading, isError, data, error } = useQuery(['news', pageState], () => NewsAPI.getNews(pageState));

	const changePage = useCallback(() => {
		if (!data?.data.totalResults) return;
		if (pageState >= Math.ceil(data?.data.totalResults / 5)) {
			setPageState(1);
			return;
		}
		setPageState(pageState + 1);
	}, [data, pageState]);

	useEffect(() => {
		queryClient.invalidateQueries('news');
	}, [pageState]);

	useEffect(() => {
		if (isError && error && sendMessage) {
			sendMessage({
				status: MessageStatusEnum.ERROR,
				title: (error as IErrorResponse).message,
			});
		}
	}, [isError, error]);

	useEffect(() => {
		return () => {
			queryClient.invalidateQueries('news');
		};
	}, []);

	return (
		<>
			<Fade in={isLoading} style={{ margin: 'auto' }}>
				<LinearProgress />
			</Fade>
			{!isLoading && data && data?.data.totalResults ? (
				<NewsTicker
					autoStart
					rowHeight={48}
					maxRows={2}
					speed={600}
					direction={Directions.UP}
					duration={4000}
					id='myId'
					style={{ height: '48px' }}
					beforeFinished={changePage}
				>
					{data?.data.articles.map((article: IArticle, index: number) => (
						<a
							key={article.publishedAt as string}
							data-testid={`article-title-${index}`}
							target='_blank'
							className={styles.newsArticleItem}
							href={article.url}
						>
							{article.title}
						</a>
					))}
				</NewsTicker>
			) : null}
		</>
	);
};

export default NewsFeed;
