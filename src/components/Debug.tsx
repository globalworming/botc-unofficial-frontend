import React from 'react';
import './Header.scss';
import Urls from "../constants/Urls";

const Debug = () => {
    return (
        <>
          <h2>debug info</h2>
          <dl>
              <dt>api</dt>
              <dd>{Urls.API}</dd>
              <dt>websocket</dt>
              <dd>{Urls.WEBSOCKET}</dd>
          </dl>
        </>
    )
}

export default Debug;