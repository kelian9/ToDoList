import MessageStatusEnum from "./enums/MessageStatusEnum";

interface IMessage {
    status: MessageStatusEnum;
    title: string;
};

export default IMessage;
