import React, {useState} from 'react';
import {useParams} from "react-router";

const initialPlayers: Array<string> = [];

const GameTable = () => {

  const {id} = useParams();
  const [players, setPlayers] = useState(initialPlayers);
  const storyteller = "you";
  const debug = { id, players, storyteller}
  const addPlayer = (player: string) => {
    setPlayers(players.concat([player]))
  }

  function idIsInTestIds(id: string) {
    return id === "bdd-1";
  }

  if (!id) {
    return null
  }

  let hasPlayers = players.length != 0;
  return (
    <>
      <section className={"grimoire"}>
        <h2>grimoire {id}</h2>
        <h3>players</h3>
        {!hasPlayers && <span className={"noPlayers"}>no players</span>}
        {hasPlayers && players.map((player, i) => <>
          <div className={"player player " + i}>{player}</div>
        </>)}
      </section>

      <section className={"gameTableProperties"}>
        <h3>debug info</h3>
        <dl>
          {Object.entries(debug).map((t, k) => <React.Fragment key={k}>
            <dt key={"dt" + k}>{t[0]}:</dt>
              <dd key={"dd" + k}>{t[1]} </dd>
          </React.Fragment>)}
        </dl>
        {idIsInTestIds(id) && <RemoteEventMocks addPlayer={addPlayer}/>}
      </section>
    </>
  );
}

type Actions = {
  addPlayer: (player: string) => void;
}

const RemoteEventMocks = ({addPlayer} : Actions) => {

  const onEnterAddPlayer = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode != 13) return;
    addPlayer(e.currentTarget.value + "")
    e.currentTarget.value = ""
  }

  return (<section className={"mocks"}>
    <h3>mock remote events</h3>
    <label>addPlayer</label><input type="text" className={"addPlayer"} onKeyDown={e => onEnterAddPlayer(e)}/>
  </section>);
}

export default GameTable;