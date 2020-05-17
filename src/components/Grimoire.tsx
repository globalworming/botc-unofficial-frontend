import * as React from "react";
import DayNightIcons from "./DayNightIcons";
import {useGlobalState} from "../state";
import PlayerSectionInGrimoire from "./PlayerSectionInGrimoire";
import GrimoireControls from "./GrimoireControls";
import Nominations from "./Nominations";

const Grimoire = () => {

  const [gameTableId] = useGlobalState("gameTableId");
  const [players] = useGlobalState("players");
  const [turn] = useGlobalState("turn");
  const [isOpenForNominations] = useGlobalState("isOpenForNominations");


  const hasPlayers = players.length > 0;

  return (<>
    <section className={"grimoire"}>
      <h2>
        Grimoire {gameTableId}: <DayNightIcons/>
      </h2>
      {turn === 0 && <a href={"/gameTable/" + gameTableId}>invite link</a>}
      <h3>players ({players.length}):</h3>
      {!hasPlayers && <span className={"noPlayers"}>no players</span>}
      {hasPlayers && <PlayerSectionInGrimoire/>}
      {isOpenForNominations && <Nominations />}
    </section>

    <GrimoireControls/>
  </>)
}

export default Grimoire