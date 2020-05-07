import * as React from "react";
import DayNightIcons from "./DayNightIcons";
import PlayerSectionInTownSquare from "./PlayerSectionInTownSquare";
import Player from "../model/Player";
import TownSquareState from "../model/TownSquareState";

const TownSquare = (townSquare: TownSquareState) => {
  return (<section className={"townSquare"}>
    <h3>Town Square {townSquare.id}: <DayNightIcons isDay={townSquare.isDay}/></h3>
    {townSquare.turn === 0 && <span>waiting for storyteller to start the game</span>}
    {townSquare.turn !== 0 && townSquare.players.map((player: Player, i: number) =>
      <PlayerSectionInTownSquare key={i} player={player} index={i}/>)}
  </section>)
}

export default TownSquare