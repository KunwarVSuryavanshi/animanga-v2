import { useState } from 'react'
import './App.scss'
import Header from './Components/Header/Header'
import HomePage from './Components/HomePage/HomePage'

function App() {

  return (
    <div className="App">
      <Header/>
      <HomePage/>
    </div>
  )
}

export default App
