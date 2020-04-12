import React, {useState, useEffect} from "react";
import {Container, Row, Col} from "react-bootstrap";
import Header from './components/Header';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput'
import "./App.css";
import {connect, sendMsg, IWebsocketMessage} from './api';

const App = () => {
  const [messages, setMessages] = useState<IWebsocketMessage[]>([])
  useEffect(() => {
    connect((message) => {
      setMessages([...messages, message])
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
            <Header/>
          </Col>
          <Col>
            <ChatHistory chatHistory={messages}/>
          </Col>
          <Col>
            <ChatInput send={onSendMessage}/>
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
