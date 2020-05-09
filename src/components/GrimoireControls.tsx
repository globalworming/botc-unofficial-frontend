import {useGlobalState} from "../state";
import Player from "../model/Player";
import StartingCharacters from "./StartingCharacters";
import Button from "react-bootstrap/Button";
import React from "react";

const GrimoireControls = () => {

  const [isDay, setIsDay] = useGlobalState("isDay");
  const [turn, setTurn] = useGlobalState("turn");
  const [players, setPlayers] = useGlobalState("players");
  const [isTestGameTable, setIsTestGameTable] = useGlobalState('isTestGameTable');
  const [gameTableId, setGameTableId] = useGlobalState("gameTableId");

  const nextTurn = () => {
    const update: Array<Player> = Object.assign([], players);
    update.forEach(player => {
      if ((isDay || player.ability === "used daily ability") || (isDay && player.ability === "used nightly ability")) {
        player.ability = "not used";
      }
    });
    setPlayers(update);
    setTurn(turn + 1)
    setIsDay(!isDay)
  }

  const startGame = () => {
    assignCharacters();
    nextTurn()
    setIsDay(false)
  }

  function assignCharacters() {
    const pickedCharacters = StartingCharacters.forNumberOfPlayers(players.length, isTestGameTable ? gameTableId : undefined);
    pickedCharacters.forEach((character, i) => {
      assignCharacter(players[i].name, character)
    })
  }

  function assignCharacter(playerName: string, character: string) {
    const updatedPlayers: Array<Player> = [];
    players.forEach(player => {
      if (playerName === player.name) {
        player.character = character;
      }
      updatedPlayers.push(player)
    });
    setPlayers(updatedPlayers)
  }

  return <section className={"controls"}>
    <h2>game controls</h2>
    {turn === 0 &&
    <Button className={"startGame"} onClick={() => startGame()}>start game when all players are present</Button>}
    {turn > 0 && (isDay ||
        <Button className={"startNextDay"} onClick={() => nextTurn()}>start the next day</Button>)}
    {turn > 0 && (isDay &&
        <Button className={"startNextNight"} onClick={() => nextTurn()}>start the next night</Button>)}
  </section>;
}

export default GrimoireControls