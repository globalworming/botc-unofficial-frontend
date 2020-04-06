import React from 'react'

export interface IMessage {
        id: number,
        text: string
}

interface IProps {
    chatHistory: IMessage[]
}

const ChatHistory = (props: IProps) => {
    const messages = props.chatHistory.map((message) => (
        <p key={message.id}>{message.text}</p> 
    ));

    return (
        <div className='chatHistory'>
            <h2> Chat</h2>
            {messages}
        </div>
    );
}

export default ChatHistory;