import React, { useMemo, useState } from 'react';
import styles from './style.module.scss';
import { Card, CardContent, CardHeader, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandMore from '@ui/ExpandMore';
import Task from '@ui/Task';
import ITask from '@models/ITask';
import moment from 'moment';

type TasksCardPropsType = {
	date: Date;
	tasksList: ITask[];
};

const TasksCard: React.FC<TasksCardPropsType> = ({ date, tasksList = [] }) => {
	const [expanded, setExpanded] = useState<boolean>(false);

	const title = useMemo(() => {
		const tasksDate = moment(date).format('DD/MM/yyyy');
		const tomorrow = moment(moment.now()).add(1, 'day').format('DD/MM/yyyy');
		if (tasksDate === tomorrow) return 'Tomorrow Tasks';
		return `${tasksDate.slice(0, 6)} Tasks`;
	}, [date]);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card
			sx={{
				margin: '32px auto',
				maxWidth: 350,
				border: 0,
				background: '#282828',
				boxShadow: '16px 16px 20px rgba(0, 0, 0, 0.15), -8px -8px 20px rgba(255, 255, 255, 0.05)',
				borderRadius: '25px',
			}}
		>
			<CardHeader
				title={
					<div className={styles.cardTitleContainer}>
						<span className={styles.cardTitleContainer__line}></span>
						<span className={styles.cardTitleContainer__taskName}>{title}</span>
					</div>
				}
				action={
					<ExpandMore expand={expanded} aria-label='show more' onClick={handleExpandClick}>
						<ExpandMoreIcon />
					</ExpandMore>
				}
			/>
			<Collapse unmountOnExit in={expanded} timeout='auto'>
				<CardContent>
					{tasksList.map((task: ITask) => (
						<div key={task.id} className={styles.taskContainer}>
							<Task {...task} />
						</div>
					))}
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default TasksCard;
