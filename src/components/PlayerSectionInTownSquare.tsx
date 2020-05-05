import React from "react";
import Player from "../model/Player";

interface PlayerSectionProps {
  player: Player,
  index: number
}

const Dead = () => <span className={"dead"}>dead</span>
const Alive = () => <span className={"alive"}>alive</span>
const VoteUsed = () => <span className={"voteUsed"}>vote used</span>
const CanVote = () => <span className={"canVote"}>can vote</span>

const PlayerSectionInTownSquare = ({player, index} : PlayerSectionProps) => {
  return <section key={index} className={"player player" + index}>
    <h3><span className={"name"}>{player.id}</span> {player.dead ? <Dead/> : <Alive/>} {player.dead && (player.canVote ? <CanVote/> : <VoteUsed/>)}</h3>
  </section>
}
export default PlayerSectionInTownSquare
