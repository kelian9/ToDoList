import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '@router/Router';
import ErrorBoundary from './ErrorBoundary';
import styles from './App.module.scss';
import '../common/styles/common.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CircularProgress } from '@mui/material';

const App: React.FC = () => {
	const queryClient = new QueryClient();

	return (
		<BrowserRouter>
			<ErrorBoundary>
				<Suspense fallback={<CircularProgress sx={{ margin: '48vh 48vw' }} />}>
					<div className={styles.main}>
						<QueryClientProvider client={queryClient}>
							<Router />
						</QueryClientProvider>
					</div>
				</Suspense>
			</ErrorBoundary>
		</BrowserRouter>
	);
};

export default App;
