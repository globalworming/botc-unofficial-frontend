import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import Button from "react-bootstrap/Button";
import RemoteEventMocks from "./RemoteEventMocks";
import Player from "../model/Player";
import StartingCharacters from "./StartingCharacters";
import PlayerSectionInGrimoire from "./PlayerSectionInGrimoire";
import DayNightIcons from "./DayNightIcons";
import TownSquare from "./TownSquare";
import RouteParams from "../model/RouteParams";

const initialPlayers: Array<Player> = [];

const GameTable = () => {

  const {id} = useParams<RouteParams>();
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [turn, setTurn] = useState(0);
  const [isStoryTeller, setIsStoryTeller] = useState(false);
  const isTestId = id === "bdd-1";
  const isDay = turn !== 0 && turn % 2 === 0;

  let hasPlayers = players.length !== 0;

  function getGame(id: string) {
    fetch('/api/gameTable/' + id)
      .then(response => response.json())
      .then(response => console.log('/api/gameTable/' + id, response))
      .catch(error => null);
  }

  useEffect(
    () => {
      getGame(id)
    }
  )

  const addPlayer = (player: Player[]) => {
    setPlayers(players.concat(player))
  }

  const nextTurn = () => {
    const updatedPlayers: Array<Player> = [];
    players.forEach(player => {
      if ((isDay || player.ability === "used daily ability") || (isDay && player.ability === "used nightly ability")) {
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

  function setCanVote(playerId: string, value: boolean) {
    const updatedPlayers: Array<Player> = [];
    players.forEach(player => {
      if (playerId === player.id) {
        player.canVote = value;
      }
      updatedPlayers.push(player)
    });
    setPlayers(updatedPlayers)
  }

  const debug = {id, players, turn, isDay};

  return (
    <>
      <section className={"grimoire"}>
        <h2>
          Grimoire {id}: <DayNightIcons isDay={isDay}/>
        </h2>
        <h3>players ({players.length}):</h3>
        {!hasPlayers && <span className={"noPlayers"}>no players</span>}
        {hasPlayers && players.map((player, i) => <PlayerSectionInGrimoire player={player} index={i} actions={{
          assignCharacter,
          setAbility,
          setDead,
          setCanVote
        }}/>)}
      </section>

      <section className={"controls"}>
        <h2>game controls</h2>
        {turn === 0 &&
        <Button className={"startGame"} onClick={() => startGame()}>start game when all players are present</Button>}
        {isDay || <Button className={"startNextDay"} onClick={() => nextTurn()}>start the next day</Button>}
        {isDay && <Button className={"startNextNight"} onClick={() => nextTurn()}>start the next night</Button>}
      </section>

      <TownSquare id={id} isDay={isDay} players={players} turn={turn} isStoryTeller={isStoryTeller}/>

      <section className={"gameTableProperties"}>
        <h3>debug info</h3>
        <dl>
          {Object.entries(debug).map((t, k) => <React.Fragment key={k}>
            <dt key={"dt" + k}>{t[0]}:</dt>
            <dd key={"dd" + k}>
              <pre>{JSON.stringify(t[1], null, 2)} </pre>
            </dd>
          </React.Fragment>)}
        </dl>
        {isTestId && <RemoteEventMocks addPlayer={addPlayer}/>}
      </section>
    </>
  );
}

export default GameTable;