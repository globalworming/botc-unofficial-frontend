import React from "react";
import Player from "../model/Player";

type Actions = {
  addPlayer: (player: Player) => void;
}

const RemoteEventMocks = ({addPlayer}: Actions) => {

  const onEnterAddPlayer = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode != 13) return;
    addPlayer({
      id: e.currentTarget.value + "",
      character: "unassigned"
    })
    e.currentTarget.value = ""
  }

  return (<section className={"mocks"}>
    <h3>mock remote events</h3>
    <label>addPlayer</label><input type="text" className={"addPlayer"} onKeyDown={e => onEnterAddPlayer(e)}/>
  </section>);
}
export default RemoteEventMocks