import Player from "./Player";

interface TownSquareState {
  players: Array<Player>
  isDay:  boolean,
  isNight: boolean,
  turn: number,
  id: string,
  updatedAt: number
}

export default TownSquareState