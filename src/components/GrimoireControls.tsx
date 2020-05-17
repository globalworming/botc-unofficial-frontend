import {useGlobalState} from "../state";
import Player from "../model/Player";
import StartingCharacters from "./StartingCharacters";
import Button from "react-bootstrap/Button";
import React from "react";
import TownSquareState from "../model/TownSquareState";
import {Redirect} from "react-router";
import Urls from "../constants/Urls";

const GrimoireControls = () => {

  const [isDay, setIsDay] = useGlobalState("isDay");
  const [turn, setTurn] = useGlobalState("turn");
  const [players, setPlayers] = useGlobalState("players");
  const [isTestGameTable] = useGlobalState('isTestGameTable');
  const [gameTableId] = useGlobalState("gameTableId");
  const [isOpenForNominations, setIsOpenForNominations] = useGlobalState("isOpenForNominations");
  const [evilWon, setEvilWins] = useGlobalState("evilWins");
  const [goodWon, setGoodWins] = useGlobalState("goodWins");

  if (evilWon) {
    return <Redirect to={"/evilWins"} />
  }
  if (goodWon) {
    return <Redirect to={"/goodWins"} />
  }


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
    if (!isTestGameTable) fetch(Urls.nextTurn(gameTableId), {method: "post"})
      .then(response => response.json())
      .then(response => apply(response))
      .catch(error => null);
  }

  function apply(response: TownSquareState) {
    setIsDay(response.isDay)
    setTurn(response.turn)
    setGoodWins(response.goodWon)
    setEvilWins(response.evilWon)
  }

  const startGame = () => {
    assignCharacters();
    setTurn(turn + 1)
    setIsDay(false)
    if (!isTestGameTable) fetch(Urls.startGame(gameTableId), {method: "post"})
      .then(response => response.json())
      .then(response => apply(response))
      .catch(error => null);

  }

  const evilWins = () => {
    setEvilWins(true)
    if (!isTestGameTable) fetch(Urls.evilWins(gameTableId), {method: "post"})
      .then(response => response.json())
      .then(response => apply(response))
      .catch(error => null);
  }

  const goodWins = () => {
    setGoodWins(true)
    if (!isTestGameTable) fetch(Urls.goodWins(gameTableId), {method: "post"})
      .then(response => response.json())
      .then(response => apply(response))
      .catch(error => null);
  }

  const callForNominations = () => {
    setIsOpenForNominations(true)
  }

  const assignCharacters = () => {
    const pickedCharacters = StartingCharacters.forNumberOfPlayers(players.length, isTestGameTable ? gameTableId : undefined);
    pickedCharacters.forEach((character, i) => {
      assignCharacter(players[i].name, character)
    })
  };

  const assignCharacter = (playerName: string, character: string) => {
    const updatedPlayers: Array<Player> = [];
    players.forEach(player => {
      if (playerName === player.name) {
        player.character = character;
      }
      updatedPlayers.push(player)
    });
    setPlayers(updatedPlayers)
  };

  return <section className={"controls"}>
    <h2>game controls</h2>
    {turn === 0 &&
    <Button className={"startGame"} onClick={() => startGame()}>start game when all players are present</Button>}
    {turn > 0 && (isDay ||
        <Button className={"startNextDay"} onClick={() => nextTurn()}>start the next day</Button>)}
    {turn > 0 && (isDay && <>
        <Button className={"startNextNight"} onClick={() => nextTurn()}>start the next night</Button>
        {isOpenForNominations || <Button className={"callForNominations"} onClick={() => callForNominations()}>call for nominations</Button>}
    </>)}
    <br/>
    {turn > 0 && <Button className={"evilWins"} onClick={() => evilWins()}>evil wins</Button>}
    {turn > 0 && <Button className={"goodWins"} onClick={() => goodWins()}>good wins</Button>}
  </section>
}

export default GrimoireControls