import React, {useState} from 'react';
import {useParams} from "react-router";
import Button from "react-bootstrap/Button";
import Characters, {Townsfolk} from "./Characters";
import shuffle from "./seedShuffle";

const initialPlayers: Array<Player> = [];

interface RouteParams {
  id: string
}

interface Player {
  id: string
  character: string
}

const GameTable = () => {

  const {id} = useParams<RouteParams>();
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [turn, setTurn] = useState(0);
  const storyteller = "you";

  const addPlayer = (player: Player) => {
    setPlayers(players.concat([player]))
  }
  const nextTurn = () => {
    setTurn(turn + 1)
  }

  const startGame = () => {
    assignCharacters();
    nextTurn()
  }

  function assignCharacters() {
    // TODO lookup how many of what type by player count
    // TODO handle baron

    // deterministic behavior for test ids
    let seed = 0;
    for (let i = 0; i <= id.length; i++) {
      seed += id.charCodeAt(i);
    }
    const shuffledCharacters: Array<string> = shuffle(Characters, seed);
    const assignableCharacters = shuffledCharacters.slice(0, players.length)
    assignableCharacters.forEach((character, i) => {
      assignCharacter(players[i].id, character)
    })
  }

  function assignCharacter(playerId: string, character: string) {
    const updatedPlayers: Array<Player> = [];
    players.forEach(player => {
      if (playerId === player.id) {
        player.character = character;
      }
      updatedPlayers.push(player)
    });
    setPlayers(updatedPlayers)
  }

  const isTestId = id === "bdd-1";
  const isFirstNight = turn === 1;
  const isNight = turn % 2 === 1;
  const isDay = turn != 0 && !isNight;

  let hasPlayers = players.length != 0;

  const debug = {id, players, storyteller, turn, isFirstNight, isNight, isDay};

  return (
    <>
      <section className={"grimoire"}>
        <h2>grimoire {id}</h2>
        <h3>players</h3>
        {!hasPlayers && <span className={"noPlayers"}>no players</span>}
        {hasPlayers && players.map((player, i) =>
          <>
            <div key={i} className={"player player" + i}>
              {player.id}
              <select value={player.character} onChange={e => assignCharacter(player.id, e.target.value)}>
                <option value="unassigned"></option>
                {Characters.map((character, i) => <option key={i} value={character}>{character}</option>)}
              </select>
            </div>
          </>
        )}
      </section>

      <section className={"controls"}>
        <h2>game controls</h2>
        {turn === 0 && <Button className={"startGame"} onClick={() => startGame()}>start game when all players are present</Button>}
        {isNight && <Button className={"startNextDay"} onClick={() => nextTurn()}>start the next day</Button>}
        {isDay && <Button className={"startNextNight"} onClick={() => nextTurn()}>start the next night</Button>}
      </section>

      <section className={"gameTableProperties"}>
        <h3>debug info</h3>
        <dl>
          {Object.entries(debug).map((t, k) => <React.Fragment key={k}>
            <dt key={"dt" + k}>{t[0]}:</dt>
            <dd key={"dd" + k}><pre>{JSON.stringify(t[1], null,  2)} </pre></dd>
          </React.Fragment>)}
        </dl>
        {isTestId && <RemoteEventMocks addPlayer={addPlayer}/>}
      </section>
    </>
  );
}

type Actions = {
  addPlayer: (player: Player) => void;
}

const RemoteEventMocks = ({addPlayer}: Actions) => {

  const onEnterAddPlayer = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode != 13) return;
    addPlayer({
      id: e.currentTarget.value + "",
      character: "unassigned"
    })
    e.currentTarget.value = ""
  }

  return (<section className={"mocks"}>
    <h3>mock remote events</h3>
    <label>addPlayer</label><input type="text" className={"addPlayer"} onKeyDown={e => onEnterAddPlayer(e)}/>
  </section>);
}

export default GameTable;