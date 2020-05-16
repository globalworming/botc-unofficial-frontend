import React from 'react';
import './Header.scss';
import Urls from "../constants/Urls";

const Debug = () => {
    return (
        <>
          <h2>debug info</h2>
          <dl>
            {Object.entries(Urls).map((t, k) => <React.Fragment key={k}>
              <dt key={"dt" + k}>{t[0]}:</dt>
              <dd key={"dd" + k}>
                <pre>{JSON.stringify(t[1], null, 2)} </pre>
              </dd>
            </React.Fragment>)}
          </dl>
        </>
    )
}

export default Debug;