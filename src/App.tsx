import React from "react";
import Header from './components/Header';
// import ChatHistory from './components/ChatHistory';
// import ChatInput from './components/ChatInput';
import GameTable from './components/GameTable';
import Lobby from './components/Lobby';
import "./App.css";
// import {connect, sendMsg, IWebsocketMessage} from './api';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import EvilWins from "./components/EvilWins";
import GoodWins from "./components/GoodWins";

const App = () => {
  /*
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

  };*/

  return (
    <div className="App">
      <Header/>
      <Router>
        <Switch>
          <Route path="/gameTable/:id" children={<GameTable/>}/>
          <Route path="/evilWins" children={<EvilWins/>}/>
          <Route path="/goodWins" children={<GoodWins/>}/>
          <Route path="/" children={<Lobby/>}/>
        </Switch>
      </Router>
      {
        //<ChatHistory chatHistory={messages}/><ChatInput send={onSendMessage}/>
      }
    </div>
  );
};
export default App;
