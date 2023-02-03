import React, { useState } from 'react';
import styles from './style.module.scss';
import { CardContent, Checkbox, Collapse } from '@mui/material';
import Task from '@ui/Task';
import ITask from '@models/ITask';

type TodayTasksPropsType = {
	tasksList: ITask[];
};

const TodayTasks: React.FC<TodayTasksPropsType> = ({ tasksList = [] }) => {
	const [expanded, setExpanded] = useState<boolean>(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div className={styles.cardContainer}>
			<div className={styles.cardTitleContainer}>
				<Checkbox
					sx={{
						color: '#F4F4F4',
						'&.Mui-checked': {
							color: '#F4F4F4',
							backgroundColor: '#121212',
						},
						'& .MuiSvgIcon-root': {
							border: 0,
						},
						'& .MuiDataGrid-columnHeader,  .MuiDataGrid-cell,  .MuiDataGrid-cellCheckbox': {
							border: 0,
							outline: 'none',
						},
						width: 17,
						height: 17,
						borderRadius: 0,
						border: 0,
					}}
					checked={expanded}
					onChange={handleExpandClick}
				/>
				<span className={styles.cardTitleContainer__taskName}>Today Tasks{expanded ? ':' : ''}</span>
			</div>
			<Collapse unmountOnExit in={expanded} timeout='auto'>
				<CardContent
					sx={{
						margin: '15px auto 0',
						maxWidth: '350px',
						paddingTop: '24px',
						boxSizing: 'border-box',
						border: 0,
						background: '#282828',
						boxShadow: '16px 16px 20px rgba(0, 0, 0, 0.15), -8px -8px 20px rgba(255, 255, 255, 0.05)',
						borderRadius: '25px',
					}}
				>
					{tasksList.map((task: ITask) => (
						<div key={task.id} className={styles.taskContainer}>
							<Task {...task} />
						</div>
					))}
				</CardContent>
			</Collapse>
		</div>
	);
};

export default TodayTasks;
