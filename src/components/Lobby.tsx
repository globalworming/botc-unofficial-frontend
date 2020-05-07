import React, {useState} from 'react';
import {Redirect} from "react-router";


const Lobby = () => {

  const [name, setName] = useState("")
  const [redirect, setRedirect] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to={"/gameTable/" + name} />
  }

  return (
    <>
      <section className={"setupGameTable"}>
        <h2>create game</h2>
        <form onSubmit={e => handleSubmit(e)} noValidate={true}>
          <fieldset>
            <legend>options</legend>
            <label>name<input type="text" className={"addPlayer"} value={name} onChange={e => setName(e.target.value)}/></label>
          </fieldset>
        </form>
      </section>
    </>
  );
}

export default Lobby;