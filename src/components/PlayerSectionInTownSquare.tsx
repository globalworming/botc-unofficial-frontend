import React from "react";
import Player from "../model/Player";
import Button from "react-bootstrap/Button";
import {useGlobalState} from "../state";

interface PlayerSectionProps {
  player: Player,
  index: number
}

const Dead = () => <div className={"dead"}>dead</div>
const Alive = () => <div className={"alive"}>alive</div>
const VoteUsed = () => <div className={"voteUsed"}>vote used</div>
const CanVote = () => <div className={"canVote"}>can vote</div>

const PlayerSectionInTownSquare = ({player, index} : PlayerSectionProps) => {

  const [isOpenForNomination, setIsOpenForNominations] = useGlobalState('isOpenForNominations');
  const [turn] = useGlobalState('turn');
  const [players, setPlayers] = useGlobalState('players');
  const [nominatedPlayer] = useGlobalState("nominatedPlayer");
  const [nominatedBy] = useGlobalState("nominatedBy");


  const nominate = (index: number) => {
    setIsOpenForNominations(false)
    const updatedPlayers: Array<Player> = [];
    const update: Array<Player> = Object.assign([], players);
    update[index].canNominate = false
    setPlayers(updatedPlayers)
  }

  return <section key={index} className={"player player" + index}>
    <h3><span className={"name"}>{player.name}</span></h3>
    {nominatedPlayer === player.name && nominatedBy && <div className={"nominated"}><span role="img" aria-label="nominated">☝️</span><span>nominated by</span><span className={"nominatedBy"}>{nominatedBy}</span></div>}
    {player.dead ? <Dead/> : <Alive/>} {player.dead && (player.canVote ? <CanVote/> : <VoteUsed/>)}
    {turn > 0 && isOpenForNomination && !nominatedPlayer && <div><Button className={"callForNominations"} onClick={() => nominate(index)}>nominate</Button></div>}
  </section>
}
export default PlayerSectionInTownSquare
