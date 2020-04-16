import * as React from "react";
import {useEffect, useState} from "react";
import DayNightIcons from "./DayNightIcons";
import PlayerSectionInTownSquare from "./PlayerSectionInTownSquare";
import {useParams} from "react-router";
import RouteParams from "../model/RouteParams";
import Player from "../model/Player";
import TownSquareState from "../model/TownSquareState";

const initialState: TownSquareState = {
  players: [], isDay: false, isNight: false, turn: 0, id: "", updatedAt: 0
}

function getTownSquareFromLocalStorage(id: string) {
  return JSON.parse(window.localStorage.getItem("botc-" + id) || JSON.stringify(initialState));
}

const TownSquare = () => {
  const {id} = useParams<RouteParams>();
  const [townSquare, setTownSquare] = useState(initialState);

  let refreshTownSquare = () => {
    let newState = getTownSquareFromLocalStorage(id);
    setTownSquare(newState);
  }

  useEffect(() => {
    let polling = setInterval(
      () => {
        refreshTownSquare();
      },
      100);
    return () => {
      clearInterval(polling);
    }
  });

  return (<section className={"townSquare"}>
    <h3>Town Square {townSquare.id}: <DayNightIcons isDay={townSquare.isDay} isNight={townSquare.isNight}/></h3>
    {townSquare.turn === 0 && <span>waiting for storyteller to start the game</span>}
    {townSquare.turn !== 0 && townSquare.players.map((player: Player, i: number) =>
      <PlayerSectionInTownSquare key={i} player={player} index={i}/>)}
  </section>)
}

export default TownSquare