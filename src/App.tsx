import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Header from './components/Header';
import ChatHistory, { IMessage } from './components/ChatHistory';
import "./App.css";
import {connect, sendMsg} from './api';

const App = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  useEffect( () => {
    connect((message) => {
      setMessages( [...messages, {id: messages.length, text: message}])
    })
  });

  const onSendMessage = () => {
    sendMsg('Hello world!')
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
            <Button
              variant = 'info'
              // size="xxl"
              // onClick={onJoin}
              >
              Join
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={onSendMessage}>
              send message
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default App;
