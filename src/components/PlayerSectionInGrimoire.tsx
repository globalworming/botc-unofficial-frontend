import Characters from "../constants/Characters";
import React from "react";
import {useGlobalState} from "../state";
import Player from "../model/Player";

const PlayerSectionInGrimoire = () => {

  const [players, setPlayers] = useGlobalState("players");

  function assignCharacter(id: string, value: string) {
    const update: Array<Player> = Object.assign([], players);
    const player = update.find(item => item.name === id);
    if (player) {
      player.character = value
      setPlayers(update)
    }
  }

  function setPoisoned(id: string, value: boolean) {
    const update: Array<Player> = Object.assign([], players);
    const player = update.find(item => item.name === id);
    if (player) {
      player.poisoned = value
      setPlayers(update)
    }
  }

  function setMad(id: string, value: boolean) {
    const update: Array<Player> = Object.assign([], players);
    const player = update.find(item => item.name === id);
    if (player) {
      player.mad = value
      setPlayers(update)
    }
  }

  function setDead(id: string, value: boolean) {
    const update: Array<Player> = Object.assign([], players);
    const player = update.find(item => item.name === id);
    if (player) {
      player.dead = value
      setPlayers(update)
    }
  }

  function setCanVote(id: string, value: boolean) {
    const update: Array<Player> = Object.assign([], players);
    const player = update.find(item => item.name === id);
    if (player) {
      player.canVote = value
      setPlayers(update)
    }
  }
  function setAbility(id: string, value: string) {
    const update: Array<Player> = Object.assign([], players);
    const player = update.find(item => item.name === id);
    if (player) {
      player.ability = value
      setPlayers(update)
    }
  }

  return ( <> {
    players.map((player, index) =>
      <section key={index} className={"player player" + index}>
        <h3 className={"name"}>{player.name}</h3>
        <select className={"isCharacter"} value={player.character}
                onChange={e => assignCharacter(player.name, e.target.value)}>
          <option value="unassigned">unassigned</option>
          {Characters.map((character, i) => <option key={i} value={character}>{character}</option>)}
        </select>
        <label className={"poisoned"}><span role="img" aria-label="poisoned">🤢</span>
          <input name="poisoned" type="checkbox" checked={player.poisoned}
                 onChange={(e) => setPoisoned(player.name, e.target.checked)}/>
        </label>
        <label className={"mad"}><span role="img" aria-label="mad">🤯</span>
          <input name="mad" type="checkbox" checked={player.mad}
                 onChange={(e) => setMad(player.name, e.target.checked)}/>
        </label>
        <label className={"dead"}><span role="img" aria-label="dead">👻</span>
          <input name="dead" type="checkbox" checked={player.dead}
                 onChange={(e) => setDead(player.name, e.target.checked)}/>
        </label>
        {player.dead && <label className={"canVote"}><span role="img" aria-label="canVote">🗳️</span>
          <input name="canVote" type="checkbox" checked={player.canVote}
                 onChange={(e) => setCanVote(player.name, e.target.checked)}/>
        </label>}
        <label> Ability
          <select className={"usedAbility"} value={player.ability}
                  onChange={e => setAbility(player.name, e.target.value)}>
            <option value="not used">not used/does not apply</option>
            <option value="used one shot ability">used one shot ability</option>
            <option value="used daily ability">used daily ability</option>
            <option value="used nightly ability">used nightly ability</option>
          </select>
        </label>

      </section>
    )
  } </> )
}
export default PlayerSectionInGrimoire
