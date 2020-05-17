import {useGlobalState} from "../state";
import React from "react";

const Nominations = () => {

  const [players] = useGlobalState("players");
  const [nominatedPlayer, setNominatedPlayer] = useGlobalState("nominatedPlayer");
  const [nominatedBy, setNominatedBy] = useGlobalState("nominatedBy");


  return <section className={"nominations"}>
    <h2>current nomination</h2>
    <label>
      player
      <select className={"nominated"} value={nominatedPlayer}
              onChange={e => setNominatedPlayer(e.target.value)}>
        <option value=""></option>
        {players.map((player, i) => <option key={i} value={player.name}>{player.name}</option>)}
      </select>
    </label>
    <label>
      nominated by
      <select className={"nominatedBy"} value={nominatedBy}
              onChange={e => setNominatedBy(e.target.value)}>
        <option value=""></option>
        {players.map((player, i) => <option key={i} value={player.name}>{player.name}</option>)}
      </select>
    </label>

  </section>
}

export default Nominations