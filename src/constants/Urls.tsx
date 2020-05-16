export interface ProcessEnv {
  [key: string]: string | undefined
}

const env: ProcessEnv = process.env;

const backendBasedOnEnv = () => {
  switch (env["NODE_ENV"]) {
    case 'production': {
      return "example.backend.botc:80"
    }
    default: {
      return "localhost:8080";
    }
  }
};

const host = backendBasedOnEnv();
export const Urls = {
  API: "http://" + host + "/api",
  WEBSOCKET: "ws://" + host + "/ws",
  GET_GAMETABLE: (id: string) => "http://" + host + '/api/gameTable/' + id,

}

export default Urls;