import { Icon } from './components';
import React, { ReactNode, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';

function TextField() {
  return (
    <div className="relative flex items-center">
      <span className="absolute w-6 ml-3 text-gray-500">
        <Icon.Search />
      </span>
      <input className="border border-gray-200 text-lg rounded-md outline-none px-2 py-1.5 w-full" type="text" name="search" id="search" />
    </div>
  )
}


function Header() {
  const history = useHistory();

  const clickSearch = () => {

    history.push("/result")
  }
  return (
    <header className="flex flex-col justify-center flex-1 items-center gap-6 pt-12">
      <h2 className="text-3xl font-bold">Where would you like to go today?</h2>
      <div className="flex flex-col w-full gap-4">
        <TextField />
        <button className="bg-blue-600 text-white py-2.5 rounded-md" onClick={clickSearch}>Search</button>
      </div>
    </header>
  );
}

type CardProps = {
  children: ReactNode,
}

function Card({ children }: CardProps) {
  return (
    <div className="bg-white rounded-md w-full p-4">
      { children }
    </div>
  )
}

function TrySearch() {
  return (
    <section className="w-full h-screen  flex flex-col gap-3">
      <h2 className="text-xl">Try Searching</h2>
      <p>Bus station nearby me</p>
      <ul className="flex flex-col gap-2">
        <li className="border-b border-gray-800 p-2 flex gap-2">
          <span className="text-gray-500"><Icon.Clock /></span> Station A
        </li>
        <li className="border-b border-gray-800 p-2 flex gap-2">
          <span className="text-gray-500"><Icon.Clock /></span> Station A
        </li>
        <li className="border-b border-gray-800 p-2 flex gap-2">
          <span className="text-gray-500"><Icon.Clock /></span> Station A
        </li>
      </ul>
    </section>
  )
}

function Result() {
  return (
    <div>
      <Card> 
      <h2 className="text-xl">Station</h2>
        <ul>
          <li>Xizhi Station</li>
        </ul>
      </Card>
    </div>
  )
}

function Background() {
  return (
    <div className="map">

    </div>
  )
}

function App() {

  return (
    <main className="h-screen w-screen flex flex-col gap-10 justify-center bg-blue-50 px-7 ">
      <Background />
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
