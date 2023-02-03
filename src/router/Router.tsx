import React from 'react';
import { Route } from 'react-router';
import { Routes, Navigate } from 'react-router-dom';
import MessagesProvider from '../context/providers/MessagesProvider';
const ToDoListView = React.lazy(() => import('@views/ToDoListView'));
import styles from './style.module.scss';

const mainLayout = (component: React.Component | React.ReactElement): JSX.Element => (
	<MessagesProvider>
		<div className={styles['outlet']}>{component as React.ReactNode}</div>
	</MessagesProvider>
);

const Router = () => {
	return (
		<Routes>
			<Route path='/home' element={mainLayout(<ToDoListView />)} />
			<Route path='*' element={<Navigate to='/home' />} />
		</Routes>
	);
};

export default Router;
