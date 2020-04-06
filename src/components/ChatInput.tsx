
import React from "react";
import "./ChatInput.scss";

interface IProps {
    send: (event: React.KeyboardEvent<HTMLInputElement>) => void
}
const ChatInput = (props: IProps) => {
    return (
        <div className="chatInput">
            {/* TODO send value not event */}
            <input onKeyDown= {props.send} />
        </div>
    )
}

export default ChatInput;