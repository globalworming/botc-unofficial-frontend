import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import RemoteEventMocks from "./RemoteEventMocks";
import Player from "../model/Player";
import PlayerSectionInGrimoire from "./PlayerSectionInGrimoire";
import DayNightIcons from "./DayNightIcons";
import TownSquare from "./TownSquare";
import PickName from "./PickName";
import RouteParams from "../model/RouteParams";
import GrimoireControls from "./GrimoireControls";
import TownSquareState from "../model/TownSquareState";
import {useGlobalState} from "../state";
import {Client, IMessage, Message} from '@stomp/stompjs';
import {IMessageEvent} from "websocket";

const GameTable = () => {
  const {id} = useParams<RouteParams>();
  const [isTestGameTable, setIsTestGameTable] = useGlobalState('isTestGameTable');
  const [gameTableId, setGameTableId] = useGlobalState("gameTableId");
  const [fetchNewData, setFetchNewData] = useState(0);

  if (!gameTableId && id === "bdd-1") {
    setIsTestGameTable(true)
    setGameTableId(id)
  }

  const [players, setPlayers] = useGlobalState("players");
  const [turn, setTurn] = useGlobalState("turn");
  const [isStoryTeller, setIsStoryTeller] = useGlobalState("isStoryTeller");
  const [isDay, setIsDay] = useGlobalState("isDay");
  const [you, setYou] = useGlobalState('you');

  useEffect(
    () => {
      if (isTestGameTable) return
      getGame()
      listenForUpdates()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchNewData]
  )

  function getGame() {
    console.log("fetching game")
    fetch('/api/gameTable/' + id)
      .then(response => response.json())
      .then(response => {apply(response)})
      .catch(error => null);
  }

  const client = new Client({
    brokerURL: "ws://localhost:8080/ws",
    connectHeaders: {
      gameTableId
    },
    debug: function (str) {
      console.log(str);
    },
  });

  function listenForUpdates() {
    client.onConnect = function(frame) {
      console.log('Additional details:',frame.headers, frame.body, frame.command);
      client.subscribe("/topic/public", (m: IMessage) => {
        console.log("message!", m.body, m.headers)
        setFetchNewData(fetchNewData + 1)
      })
      // Do something, all subscribes must be done is this callback
      // This is needed because this will be executed after a (re)connect
    };

    client.onStompError = function (frame) {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    client.activate();
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