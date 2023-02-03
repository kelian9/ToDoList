import React, { useEffect, useMemo, useState } from 'react';
import MessagesContext from '../../MessagesContext';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Collapse, IconButton } from '@mui/material';
import IMessage from '@models/IMessage';

const MessagesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [messages, setMessages] = useState<IMessage[]>([]);

	const sendMessage = (message: IMessage) => {
		setMessages([...messages, message]);
	};

	const removeMessage = (index: number) => {
		setMessages([...messages.slice(0, index), ...messages.slice(index + 1)]);
	};

	const context = useMemo(
		() => ({
			messages,
			sendMessage,
			removeMessage,
		}),
		[messages]
	);

	useEffect(() => {
		setMessages(context.messages);
	}, []);

	return (
		<MessagesContext.Provider value={context}>
			<Collapse in={!!messages.length}>
				{messages.map((message, index) => (
					<Alert
						key={message.title + index}
						action={
							<IconButton
								aria-label='close'
								color='inherit'
								size='small'
								onClick={() => {
									removeMessage(index);
								}}
							>
								<CloseIcon fontSize='inherit' />
							</IconButton>
						}
						severity={message.status}
						sx={{ mb: 2 }}
					>
						{message.title}
					</Alert>
				))}
			</Collapse>
			{children}
		</MessagesContext.Provider>
	);
};

export default MessagesProvider;
