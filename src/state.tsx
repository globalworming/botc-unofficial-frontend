import {createGlobalState} from 'react-hooks-global-state';
import Player from "./model/Player";

const initialPlayers: Array<Player> = [];

export const {useGlobalState} = createGlobalState({
  evilWins: false,
  goodWins: false,
  isDay: true,
  isStoryTeller: true,
  isTestGameTable: false,
  gameTableId: "",
  players: initialPlayers,
  turn: 0,
  you: ""
});
