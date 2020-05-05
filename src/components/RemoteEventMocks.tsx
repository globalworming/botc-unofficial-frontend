import React from "react";
import Player from "../model/Player";


type Actions = {
  addPlayer: (player: Player[]) => void;
}

const NewPlayer = {
  withName: (name: string) => { return {id: name, character: "unassigned", ability: "not used", dead: false, canVote: true}}
}

const RemoteEventMocks = ({addPlayer}: Actions) => {

  const onEnterAddPlayer = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode != 13) return;
    addPlayer([NewPlayer.withName(e.currentTarget.value)]);
    e.currentTarget.value = ""
  }

  return (<section className={"mocks"}>
    <h3>mock remote events</h3>
    <label>addPlayer</label><input type="text" className={"addPlayer"} onKeyDown={e => onEnterAddPlayer(e)}/>
    <button className={"addPlayer"} onClick={() => {
      const players: Array<Player> = [];
      ["peter", "dana", "bob", "jupiter", "strange"].forEach((name) =>
        players.push(NewPlayer.withName(name)))
      addPlayer(players)
  }}>add 5 players</button>
  </section>);
}
export default RemoteEventMocks