import React, {useState} from 'react';
import {useParams} from "react-router";
import Button from "react-bootstrap/Button";
import RemoteEventMocks from "./RemoteEventMocks";
import Player from "../model/Player";
import StartingCharacters from "./StartingCharacters";
import PlayerSectionInGrimoire from "./PlayerSectionInGrimoire";
import PlayerSectionInTownSquare from "./PlayerSectionInTownSquare";
import DayNightIcons from "./DayNightIcons";

const initialPlayers: Array<Player> = [];

interface RouteParams {
  id: string
}

const GameTable = () => {

  const {id} = useParams<RouteParams>();
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [turn, setTurn] = useState(0);
  const storyteller = "you";

  const addPlayer = (player: Player[]) => {
    setPlayers(players.concat(player))
  }
  const nextTurn = () => {
    const updatedPlayers: Array<Player> = [];
    players.forEach(player => {
      if ((isNight && player.ability === "used daily ability") || (isDay && player.ability === "used nightly ability")) {
        player.ability = "not used";
      }
      updatedPlayers.push(player)
    });
    setPlayers(updatedPlayers);
    setTurn(turn + 1)
  }

  const startGame = () => {
    assignCharacters();
    nextTurn()
  }

  function assignCharacters() {
    const pickedCharacters = StartingCharacters.forNumberOfPlayers(players.length, isTestId ? id : undefined);
    pickedCharacters.forEach((character, i) => {
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

 function setAbility(playerId: string, value: string) {
    const updatedPlayers: Array<Player> = [];
    players.forEach(player => {
      if (playerId === player.id) {
        player.ability = value;
      }
      updatedPlayers.push(player)
    });
    setPlayers(updatedPlayers)
  }

 function setDead(playerId: string, value: boolean) {
    const updatedPlayers: Array<Player> = [];
    players.forEach(player => {
      if (playerId === player.id) {
        player.dead = value;
      }
      updatedPlayers.push(player)
    });
    setPlayers(updatedPlayers)
  }

 function setUsedVote(playerId: string, value: boolean) {
    const updatedPlayers: Array<Player> = [];
    players.forEach(player => {
      if (playerId === player.id) {
        player.usedVote = value;
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
        <h2>
          Grimoire {id}: <DayNightIcons isDay={isDay} isNight={isNight} />
        </h2>
        <h3>players ({players.length}):</h3>
        {!hasPlayers && <span className={"noPlayers"}>no players</span>}
        {hasPlayers && players.map((player, i) => <PlayerSectionInGrimoire player={player} index={i} actions={{assignCharacter, setAbility, setDead, setUsedVote}}/>)}
      </section>

      <section className={"controls"}>
        <h2>game controls</h2>
        {turn === 0 && <Button className={"startGame"} onClick={() => startGame()}>start game when all players are present</Button>}
        {isNight && <Button className={"startNextDay"} onClick={() => nextTurn()}>start the next day</Button>}
        {isDay && <Button className={"startNextNight"} onClick={() => nextTurn()}>start the next night</Button>}
      </section>

      <section className={"townsquare"}>
        <h3>Town Square {id}: <DayNightIcons isDay={isDay} isNight={isNight} /></h3>
        {turn === 0 && <span>waiting for storyteller to start the game</span> }
        {turn !== 0 && players.map((player, i) => <PlayerSectionInTownSquare player={player} index={i}/>)}
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

export default GameTable;