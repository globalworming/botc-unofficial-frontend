import {useGlobalState} from "../state";
import React from "react";
import RemoteEventMocks from "./RemoteEventMocks";

const GameTableDebug = () => {

  const [evilWins] = useGlobalState("evilWins");
  const [goodWins] = useGlobalState("goodWins");
  const [isDay] = useGlobalState("isDay");
  const [isOpenForNominations] = useGlobalState("isOpenForNominations");
  const [isStoryTeller] = useGlobalState('isStoryTeller');
  const [isTestGameTable] = useGlobalState('isTestGameTable');
  const [gameTableId] = useGlobalState('gameTableId');
  const [nominatedPlayer] = useGlobalState('nominatedPlayer');
  const [nominatedBy] = useGlobalState("nominatedBy");
  const [players] = useGlobalState("players");
  const [playerUpForVoting] = useGlobalState("playerUpForVoting");
  const [turn] = useGlobalState("turn");
  const [you] = useGlobalState("you");


  const debug = {
    evilWins,
    goodWins,
    isDay,
    isOpenForNominations,
    isStoryTeller,
    isTestGameTable,
    gameTableId,
    nominatedPlayer,
    nominatedBy,
    players,
    playerUpForVoting,
    turn,
    you
  };


  return <section className={"gameTableProperties"}>
    <h2>debug info</h2>
    <dl>
      {Object.entries(debug).map((t, k) => <React.Fragment key={k}>
        <dt key={"dt" + k}>{t[0]}:</dt>
        <dd key={"dd" + k}>
          <pre>{JSON.stringify(t[1], null, 2)} </pre>
        </dd>
      </React.Fragment>)}
    </dl>
    {isTestGameTable && <RemoteEventMocks/>}
  </section>
}

export default GameTableDebug