import Characters from "../constants/Characters";
import React, {useState} from "react";
import Player from "../model/Player";

interface PlayerSectionProps {
  player: Player,
  index: number,
  actions: {
    assignCharacter: (playerId: string, character: string) => void
    setAbility: (playerId: string, value: string) => void
  }
}

const PlayerSection = ({player, index, actions} : PlayerSectionProps) => {

  const [poisoned, setPoisoned] = useState(false);
  const [mad, setMad] = useState(false);
  const [dead, setDead] = useState(false);
  const [usedVote, setUsedVote] = useState(false);


  return <section key={index} className={"player player" + index}>
    <h3>{player.id}</h3>
    <select className={"isCharacter"} value={player.character}
            onChange={e => actions.assignCharacter(player.id, e.target.value)}>
      <option value="unassigned"></option>
      {Characters.map((character, i) => <option key={i} value={character}>{character}</option>)}
    </select>
    <label className={"poisoned"}><span role="img" aria-label="poisoned">🤢</span>
      <input name="poisoned" type="checkbox" checked={poisoned} onChange={(e) => setPoisoned(e.target.checked)}/>
    </label>
    <label className={"mad"}><span role="img" aria-label="mad">🤯</span>
      <input name="mad" type="checkbox" checked={mad} onChange={(e) => setMad(e.target.checked)}/>
    </label>
    <label className={"dead"}><span role="img" aria-label="dead">👻</span>
      <input name="dead" type="checkbox" checked={dead} onChange={(e) => setDead(e.target.checked)}/>
    </label>
    {dead && <label className={"usedVote"}><span role="img" aria-label="usedVote">🗳️</span>
      <input name="usedVote" type="checkbox" checked={!usedVote} onChange={(e) => setUsedVote(!e.target.checked)}/>
    </label>}
    <label> Ability
    <select className={"usedAbility"} value={player.ability}
            onChange={e => actions.setAbility(player.id, e.target.value)}>
      <option value="not used">not used/does not apply</option>
      <option value="used one shot ability">used one shot ability</option>
      <option value="used daily ability">used daily ability</option>
      <option value="used nightly ability">used nightly ability</option>
    </select>
  </label>

  </section>
}
export default PlayerSection
