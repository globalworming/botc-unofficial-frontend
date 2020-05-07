import React from 'react';
import './Message.scss';
import {IWebsocketMessage} from '../api';

interface IProps {
    message: IWebsocketMessage
}
const Message = (props: IProps) => {
    // useEffect( () => {
        
    // });
    return (
        <div className="message"> {props.message}</div>
    )
};
export default Message