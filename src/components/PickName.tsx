import React, {useState} from "react";
import {useGlobalState} from "../state";
import TownSquareState from "../model/TownSquareState";
import Urls from "../constants/Urls";

const PickName = () => {

  const [you, setYou] = useGlobalState('you');
  const [localYou, setLocalYou] = useState(you)
  const [gameTableId] = useGlobalState("gameTableId");
  const [, setPlayers] = useGlobalState("players");


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(Urls.joinGame(gameTableId, localYou), {method: "post"})
      .then(response => response.json())
      .then(response => apply(response))
      .catch(error => null);
  }

  function apply(response: TownSquareState) {
    setPlayers(response.players)
    return setYou(response.you);
  }


  return (
    <section className={"enterName"}>
      <h3>pick a name to join game</h3>
      <form onSubmit={e => handleSubmit(e)}>
        <fieldset>
          <label>name
            <input type="text" value={localYou} onChange={(e) => setLocalYou(e.target.value)}/>
          </label>
        </fieldset>
      </form>
    </section>
  )
}

export default PickName

