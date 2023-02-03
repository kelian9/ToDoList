import React from 'react';
import ITask from '@models/ITask';

interface ITasksContext {
	tasks: ITask[];
	changeTaskById?: (id: number) => void;
}

const TasksContext = React.createContext<ITasksContext>({
	tasks: [],
});

export default TasksContext;
