import ITask from '@models/ITask';
import TaskSwitch from '@ui/TaskSwitch';
import React, { useContext, useEffect, useState } from 'react';
import getRandomColor from '../../../utils/getRandomColor';
import TasksContext from '../../../context/TasksContext';
import styles from './style.module.scss';

interface TaskPropsType extends ITask {
	dataTestId?: string;
}

const Task = (props: TaskPropsType) => {
	const { id, title, description, done } = props;
	const [color, setColor] = useState<string>('');

	const { changeTaskById } = useContext(TasksContext);

	const handleSwitchChange = () => {
		if (!changeTaskById) return;
		changeTaskById(id);
	};

	useEffect(() => setColor(getRandomColor), []);

	return (
		<div className={styles.taskContainer}>
			<span
				className={styles.taskContainer__line}
				style={{
					backgroundColor: color,
				}}
			/>
			<div className={styles.taskContainer__heading}>
				<span
					data-test-id={`task-${id}-title`}
					className={styles.title}
					style={{ textDecoration: done ? 'line-through' : 'none' }}
				>
					{title}
				</span>
				<span className={styles.description}>{description}</span>
			</div>
			<TaskSwitch checked={done} sx={{ margin: '8px 0 0 0' }} onChange={handleSwitchChange} />
		</div>
	);
};

export default Task;
