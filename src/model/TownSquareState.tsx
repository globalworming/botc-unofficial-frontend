import Player from "./Player";

interface TownSquareState {
  players: Array<Player>
  isDay:  boolean,
  turn: number,
  id: string,
  isStoryTeller: boolean
}

export default TownSquareState