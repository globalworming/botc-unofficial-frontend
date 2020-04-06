import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Header from './components/Header';
import ChatHistory, { IMessage } from './components/ChatHistory';
import ChatInput from './components/ChatInput'
import "./App.css";
import {connect, sendMsg} from './api';

const App = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  useEffect( () => {
    connect((message) => {
      setMessages( [...messages, {id: messages.length, text: message}])
    })
  });

  const onSendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      sendMsg(event.currentTarget.value)
      event.currentTarget.value = ""
    }
    
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Header />
          </Col>
          <Col>
          <ChatHistory chatHistory= {messages}/>
          </Col>
          <Col>
          <ChatInput send ={onSendMessage} />
          </Col>
        </Row>
        <Row>
          <Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default App;
