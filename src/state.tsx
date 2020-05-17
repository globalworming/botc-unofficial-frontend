import {createGlobalState} from 'react-hooks-global-state';
import Player from "./model/Player";

const initialPlayers: Array<Player> = [];

export const {useGlobalState} = createGlobalState({
  evilWins: false,
  goodWins: false,
  isDay: true,
  isOpenForNominations: false,
  isStoryTeller: true,
  isTestGameTable: false,
  gameTableId: "",
  nominatedPlayer: "",
  nominatedBy: "",
  players: initialPlayers,
  playerUpForVoting: -1,
  turn: 0,
  you: ""
});
