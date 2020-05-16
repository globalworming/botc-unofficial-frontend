export interface ProcessEnv {
  [key: string]: string | undefined
}

declare global {
  interface Window {
    _env_: {
      API: string,
      WEBSOCKET: string
    }
  }
}
const env = window._env_;
const API = env.API
const WEBSOCKET = env.WEBSOCKET

const getGameTable = (gameTableId: string) => API + '/gameTable/' + gameTableId;

export const Urls = {
  API,
  WEBSOCKET,
  getGameTable,
  createGameTable: (name: string) => API + "/gameTables?id=" + name,
  nextTurn: (gameTableId: string) => getGameTable(gameTableId) + '/nextTurn',
  startGame: (gameTableId: string) => getGameTable(gameTableId) + '/start',
  evilWins: (gameTableId: string) => getGameTable(gameTableId) + '/evilWins',
  goodWins: (gameTableId: string) => getGameTable(gameTableId) + '/goodWins',
  joinGame: (gameTableId: string, localYou: string) => getGameTable(gameTableId) + '/players?name=' + localYou,
  killPlayer: (gameTableId: string, playerId: string) => getGameTable(gameTableId) + '/player/' + playerId + "/kill",
  playerHasVoted: (gameTableId: string, playerId: string) => getGameTable(gameTableId) + '/player/' + playerId + "/voted"
}

export default Urls;