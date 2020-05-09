import React, {useState} from 'react';
import {Redirect} from "react-router";
import TownSquareState from "../model/TownSquareState";


const Lobby = () => {

  const [name, setName] = useState("")
  const [redirect, setRedirect] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch("/api/gameTables?id=" + name , {method: 'post'})
      .then(response => response.json())
      .then(response => apply(response))
      .catch(error => null);
  }

  function apply(response: TownSquareState) {
    if (response.id === name) {
      setRedirect(true)
    }
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