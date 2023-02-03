import IMessage from '@models/IMessage';
import React from 'react';

interface ITasksContext {
	messages: IMessage[];
	sendMessage?: (message: IMessage) => void;
	removeMessage?: (index: number) => void;
}

const MessagesContext = React.createContext<ITasksContext>({
	messages: [],
});

export default MessagesContext;
