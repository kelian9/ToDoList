import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useQuery } from 'react-query';
import ITask from '@models/ITask';
import TasksCard from '@ui/TasksCard';
import TasksContext from '../../../context/TasksContext';
import TasksAPI from '@api/TasksAPI';
import groupListByDate from '../../../utils/groupListByDate';
import ITasksGroup from '@models/ITasksGrops';
import TodayTasks from '@ui/TodayTasks';
import NewsFeed from '@ui/NewsFeed';
import { IconButton, Popover } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Switch from '@mui/material/Switch';
import styles from './style.module.scss';
import MessagesContext from '../../../context/MessagesContext';
import MessageStatusEnum from '@models/enums/MessageStatusEnum';
import IErrorResponse from '@models/responses/IErrorResponse';

const ToDoListView: React.FC = () => {
	const messagesContext = useContext(MessagesContext);
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const [isNewsTickerVisible, toggleNewsTickerVision] = useState<boolean>(false);
	const { isLoading, isError, data, error } = useQuery(['tasks'], () => TasksAPI.getTasks());

	const open = Boolean(anchorEl);
	const id = 'settings-popover';

	const tasksSinceTomorrow = useMemo(() => {
		const groups = groupListByDate(tasks);
		const today = moment(moment.now());
		today.set('hours', 23);
		today.set('minutes', 59);
		today.set('seconds', 59);
		return groups.filter((group: ITasksGroup) => moment(group.date).isAfter(today));
	}, [tasks]);

	const todayTasksList = useMemo(() => {
		const groups = groupListByDate(tasks);
		const today = moment(moment.now()).format('DD/MM/yyyy');
		const todayGroups = groups.filter((group: ITasksGroup) => moment(group.date).format('DD/MM/yyyy') === today);
		return todayGroups.length ? todayGroups[0].list : [];
	}, [tasks]);

	const TodayTasksMemoized = useMemo(
		() => (todayTasksList.length ? <TodayTasks tasksList={todayTasksList} /> : null),
		[todayTasksList]
	);
	const NewsMemoized = useMemo(() => (isNewsTickerVisible ? <NewsFeed /> : null), [isNewsTickerVisible]);

	const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleSettingsClose = () => {
		setAnchorEl(null);
	};

	const changeTaskById = useCallback(
		(id: number) => {
			const taskIndex = tasks.findIndex((task: ITask) => task.id === id);
			const taskCurrentState = tasks[taskIndex];
			setTasks([
				...tasks.slice(0, taskIndex),
				{
					...taskCurrentState,
					done: !taskCurrentState.done,
				},
				...tasks.slice(taskIndex + 1),
			]);
		},
		[tasks]
	);

	const context = useMemo(
		() => ({
			tasks,
			changeTaskById,
		}),
		[tasks]
	);

	useEffect(() => {
		if (!isLoading && !isError && data?.data) {
			setTasks(data?.data);
		}
	}, [data]);

	useEffect(() => {
		const { sendMessage } = messagesContext;
		if (isError && error && sendMessage) {
			sendMessage({
				status: MessageStatusEnum.ERROR,
				title: (error as IErrorResponse).message,
			});
		}
	}, [isError, error]);

	return (
		<TasksContext.Provider value={context}>
			<div className={styles.toDoList}>
				<h1>
					To Do
					<IconButton
						aria-label='setting'
						data-testid='settings'
						aria-describedby={id}
						style={{
							fontSize: '28px',
							color: '#F4F4F4',
							transform: anchorEl ? 'rotate(-90deg)' : 'none',
							transformOrigin: 'center',
							transition: '500ms',
						}}
						onClick={handleSettingsClick}
					>
						<SettingsIcon fontSize='large' />
					</IconButton>
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: -120,
						}}
						sx={{
							'.MuiPaper-root': {
								padding: '10px',
								backgroundColor: '#F4F4F4',
								boxShadow: '0 0 15px rgba(0, 0, 0, 1)',
								borderRadius: '10px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							},
						}}
						onClose={handleSettingsClose}
					>
						<p>News Ticker</p>
						<Switch
							data-testid='news-toggle'
							checked={isNewsTickerVisible}
							onChange={() => toggleNewsTickerVision(!isNewsTickerVisible)}
						/>
					</Popover>
				</h1>
				<div className={styles.tasksListContainer}>
					{TodayTasksMemoized}
					{tasksSinceTomorrow.map((group) => (
						<TasksCard key={group.date} date={new Date(group.date)} tasksList={group.list} />
					))}
				</div>
				{NewsMemoized}
			</div>
		</TasksContext.Provider>
	);
};

export default ToDoListView;
