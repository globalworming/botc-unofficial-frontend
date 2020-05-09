import React, {useEffect} from 'react';
import {useParams} from "react-router";
import Button from "react-bootstrap/Button";
import RemoteEventMocks from "./RemoteEventMocks";
import Player from "../model/Player";
import StartingCharacters from "./StartingCharacters";
import PlayerSectionInGrimoire from "./PlayerSectionInGrimoire";
import DayNightIcons from "./DayNightIcons";
import TownSquare from "./TownSquare";
import PickName from "./PickName";
import RouteParams from "../model/RouteParams";
import GrimoireControls from "./GrimoireControls";
import TownSquareState from "../model/TownSquareState";
import {useGlobalState} from "../state";


const GameTable = () => {
  const {id} = useParams<RouteParams>()
  const [gameTableId, setGameTableId] = useGlobalState("gameTableId");
  const [players, setPlayers] = useGlobalState("players");
  const [turn, setTurn] = useGlobalState("turn");
  const [isStoryTeller, setIsStoryTeller] = useGlobalState("isStoryTeller");
  const [isDay, setIsDay] = useGlobalState("isDay");
  const [you, setYou] = useGlobalState('you');
  const [isTestGameTable, setIsTestGameTable] = useGlobalState('isTestGameTable');

  useEffect(
    () => {
      if (id === "bdd-1") {
        setIsTestGameTable(true)
        return setGameTableId(id);
      }
      getGame(id)
    }, []
  )

  function getGame(id: string) {
    fetch('/api/gameTable/' + id)
      .then(response => response.json())
      .then(response => apply(response))
      .catch(error => null);
  }

  function apply(response: TownSquareState) {
    setPlayers(response.players)
    setTurn(response.turn)
    setIsStoryTeller(response.isStoryTeller)
    setYou(response.you)
    setGameTableId(response.id)
    setIsDay(response.turn > 0 && response.turn % 2 === 0)
  }

  const addPlayer = (player: Player[]) => {
    setPlayers(players.concat(player))
  }

  const hasPlayers = players.length !== 0;
  const debug = {gameTableId, players, turn, isDay, isStoryTeller, you};
  return (
    <>
      <a href={"/gameTable/" + gameTableId}>link to this page</a>
      {isStoryTeller && <>
        <section className={"grimoire"}>
          <h2>
            Grimoire {gameTableId}: <DayNightIcons/>
          </h2>
          <h3>players ({players.length}):</h3>
          {!hasPlayers && <span className={"noPlayers"}>no players</span>}
          {hasPlayers && <PlayerSectionInGrimoire/>}
        </section>

        <GrimoireControls/>
      </>}


      {!isStoryTeller && you.length === 0 && <PickName/>}
      {(!isStoryTeller || isTestGameTable) && <TownSquare/>}

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
        {isTestGameTable && <RemoteEventMocks addPlayer={addPlayer}/>}
      </section>
    </>
  );
}

export default GameTable;