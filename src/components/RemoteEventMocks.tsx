import React, {useState} from "react";
import Player from "../model/Player";

type Actions = {
  addPlayer: (player: Player[]) => void;
}

const NewPlayer = {
  withName: (name: string) => {
    return {name, character: "unassigned", ability: "not used", dead: false, canVote: true, poisoned: false, mad: false}
  }
}

const RemoteEventMocks = ({addPlayer}: Actions) => {

  const [playerName, setPlayerName]  = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addPlayer([NewPlayer.withName(playerName)]);
    setPlayerName("")
  }

  return (<section className={"mocks"}>
    <h3>mock remote events</h3>
    <form onSubmit={e => handleSubmit(e)}>
      <fieldset>
        <label>addPlayer
          <input type="text" className={"addPlayer"} value={playerName} onChange={(e) => setPlayerName(e.target.value)}/>
        </label>
      </fieldset>
    </form>

    <button onClick={() => addPlayer(["peter", "dana", "bob", "jupiter", "strange"]
      .map((name) => NewPlayer.withName(name)))
    }>add 5 players
    </button>
  </section>);
}
export default RemoteEventMocks