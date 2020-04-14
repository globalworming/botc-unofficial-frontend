import React, {useState, useEffect} from "react";
import Header from './components/Header';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import GameTable from './components/GameTable';
import "./App.css";
import {connect, sendMsg, IWebsocketMessage} from './api';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

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
      <Header/>
      <Router>
        <Switch>
          <Route path="/gameTable/:id" children={<GameTable/>}/>
        </Switch>
      </Router>
      <ChatHistory chatHistory={messages}/>
      <ChatInput send={onSendMessage}/>
    </div>
  );
};
export default App;
