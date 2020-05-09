import * as React from "react";
import DayNightIcons from "./DayNightIcons";
import PlayerSectionInTownSquare from "./PlayerSectionInTownSquare";
import Player from "../model/Player";
import {useGlobalState} from "../state";

const TownSquare = () => {

  const [players, setPlayers] = useGlobalState('players');
  const [gameTableId, setGameTableId] = useGlobalState("gameTableId");
  const [turn, setTurn] = useGlobalState("turn");

  return (<>
    <section className={"townSquare"}>
      <h3>Town Square {gameTableId}: <DayNightIcons/></h3>
      {turn === 0 && <span>waiting for storyteller to start the game</span>}
      {players.map((player: Player, i: number) =>
        <PlayerSectionInTownSquare key={i} player={player} index={i}/>)}
    </section>
  </>)
}

export default TownSquare