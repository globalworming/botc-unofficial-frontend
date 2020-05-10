import Player from "./Player";

interface TownSquareState {
  you: string
  players: Array<Player>
  isDay:  boolean,
  turn: number,
  id: string,
  goodWon: boolean,
  evilWon: boolean,
  isStoryTeller: boolean
}

export default TownSquareState