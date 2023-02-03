interface ITask {
    id: number;
    date: Date | string;
    title: string;
    description: string;
    done: boolean;
}

export default ITask;
