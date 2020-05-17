import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import TownSquare from "./TownSquare";
import PickName from "./PickName";
import RouteParams from "../model/RouteParams";
import TownSquareState from "../model/TownSquareState";
import {useGlobalState} from "../state";
import Urls from "../constants/Urls";
import {Client, IMessage, StompSubscription} from '@stomp/stompjs';
import GameTableDebug from "./GameTableDebug";
import Grimoire from "./Grimoire";

const GameTable = () => {
  const {id} = useParams<RouteParams>();
  const [isTestGameTable, setIsTestGameTable] = useGlobalState('isTestGameTable');
  const [gameTableId, setGameTableId] = useGlobalState("gameTableId");
  const [fetchNewData, setFetchNewData] = useState(0);
  const [channel, setChannel] = useState<StompSubscription>();

  if (!gameTableId && id === "bdd-1") {
    setIsTestGameTable(true);
    setGameTableId(id)
  }

  const [, setPlayers] = useGlobalState("players");
  const [, setTurn] = useGlobalState("turn");
  const [isStoryTeller, setIsStoryTeller] = useGlobalState("isStoryTeller");
  const [, setIsDay] = useGlobalState("isDay");
  const [you, setYou] = useGlobalState('you');


  useEffect(() => {
      if (isTestGameTable) return;
      getGame();
      listenForUpdates();
      return () => {
        channel?.unsubscribe();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchNewData]
  );

  function getGame() {
    fetch(Urls.getGameTable(id))
      .then(response => response.json())
      .then(response => {
        apply(response)
      })
      .catch(error => null);
  }
  const client = new Client({
    brokerURL: Urls.WEBSOCKET,
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
      const stompSubscription = client.subscribe("/topic/gameTable/" + id + "/updates", (m: IMessage) => {
        setFetchNewData(fetchNewData + 1)
      });
      setChannel(stompSubscription)
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
    setPlayers(response.players);
    setTurn(response.turn);
    setIsStoryTeller(response.isStoryTeller);
    setYou(response.you);
    setGameTableId(response.id);
    setIsDay(response.turn > 0 && response.turn % 2 === 0)
  }

  return (
    <>
      {isStoryTeller && <Grimoire />}
      {!isStoryTeller && you.length === 0 && <PickName/>}
      {(!isStoryTeller || isTestGameTable) && <TownSquare/>}

      <GameTableDebug/>
    </>
  );
};

export default GameTable;