import React from 'react'
import { IWebsocketMessage } from '../api';
import Message from './Message'

interface IProps {
    chatHistory: IWebsocketMessage[]
}

const ChatHistory = (props: IProps) => {
    const messages = props.chatHistory.map((message) => (
        <Message message= {message}/>
    ));

    return (
        <div className='chatHistory'>
            <h2> Chat</h2>
            {messages}
        </div>
    );
}

export default ChatHistory;