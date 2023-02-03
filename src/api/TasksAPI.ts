import IErrorResponse from '../models/responses/IErrorResponse';
import axios, { AxiosResponse } from 'axios';
import ITask from '@models/ITask';

class TasksAPI {
	public static getTasks(): Promise<AxiosResponse<ITask[], IErrorResponse>> {
		return axios.get('/db/tasks.json', { responseType: 'json' });
	}
}

export default TasksAPI;
