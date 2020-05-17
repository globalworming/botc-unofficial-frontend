import React, {useState} from "react";
import Player from "../model/Player";
import {useGlobalState} from "../state";

type Actions = {
  addPlayer: (player: Player[]) => void;
}

const NewPlayer = {
  withName: (name: string) => {
    return {name, character: "unassigned", ability: "not used", dead: false, canVote: true, poisoned: false, mad: false, canNominate: true}
  }
}

const RemoteEventMocks = () => {
  const [players, setPlayers] = useGlobalState("players");
  const [localPlayerName, setLocalPlayerName] = useState("");
  const [, setNominatedPlayer] = useGlobalState("nominatedPlayer");
  const [, setNominatedBy] = useGlobalState("nominatedBy");
  const [localNominatedPlayer, setLocalNominatedPlayer]  = useState("")
  const [localNominatedBy, setLocalNominatedBy]  = useState("")

  function addPlayer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const update: Array<Player> = Object.assign([], players);
    update.push(NewPlayer.withName(localPlayerName));
    setPlayers(update);
    setLocalPlayerName("")
  }

  function addPlayers(newPlayers: Array<string>) {
    const update: Array<Player> = Object.assign([], players);
    setPlayers(update.concat(newPlayers.map((name) => NewPlayer.withName(name))));
  }

  function nominate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNominatedPlayer(localNominatedPlayer)
    setNominatedBy(localNominatedBy)
    setLocalNominatedPlayer("")
    setLocalNominatedBy("")
  }

  return (<section className={"mocks"}>
    <h3>mock remote events</h3>
    <form onSubmit={e => addPlayer(e)}>
      <fieldset>
        <label>addPlayer
          <input type="text" className={"addPlayer"} value={localPlayerName} onChange={(e) => setLocalPlayerName(e.target.value)}/>
        </label>
        <input type="submit"/>
      </fieldset>
    </form>

    <form onSubmit={e => nominate(e)}>
      <fieldset>
        <label>player
          <input type="text" className={"playerToNominate"} value={localNominatedPlayer} onChange={(e) => setLocalNominatedPlayer(e.target.value)}/>
        </label>
        nominated by
        <label>
          <input type="text" className={"nominatingPlayer"} value={localNominatedBy} onChange={(e) => setLocalNominatedBy(e.target.value)}/>
        </label>
        <input type="submit"/>
      </fieldset>
    </form>

    <button onClick={() => addPlayers(["peter", "dana", "bob", "jupiter", "strange"])
    }>add 5 players
    </button>
  </section>);
}
export default RemoteEventMocks