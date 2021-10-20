import React, { ReactNode, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';

function TextField() {
  return (

    <input className="border border-gray-200 text-lg rounded outline-none px-2 py-1" type="text" name="search" id="search" />
  )
}

// function Search

function Header() {
  const history = useHistory();

  const clickSearch = () => {
    history.push("/result")
  }
  return (
    <header className="flex flex-col justify-center items-center gap-4 pt-10">
      <h2>Where would you like to go today</h2>
      <div className="flex flex-col gap-4">
        <TextField />
        <button className="bg-green-400 py-2" onClick={clickSearch}>Search</button>
      </div>
    </header>
  );
}

function TrySearch() {
  return (
    <section className="w-full h-screen  p-4 flex flex-col gap-3">
      <h2 className="text-xl">Try Searching</h2>
      <p>Bus station nearby me</p>
      <ul className="flex flex-col gap-2">
        <li className="border-b border-gray-800 p-2">
          Station A
        </li>
        <li className="border-b border-gray-800 p-2">
          Station A
        </li>
        <li className="border-b border-gray-800 p-2">
          Station A
        </li>
      </ul>
    </section>
  )
}

function Result() {
  return (
    <div>
      <h2>Result</h2>
    </div>
  )
}


function App() {

  return (
    <main className="h-screen w-screen flex flex-col gap-10 justify-center bg-blue-50">
      <Header />
      <Switch>
        <Route path='/' exact>
          <TrySearch />
        </Route>
        <Route path='/result' exact>
          <Result />
        </Route>
      </Switch>
    </main>
  )
}

export default App
