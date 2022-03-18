import { useState } from 'react'
import {ContextProvider} from './components/PlayerContext'
import Game from './components/Game'
import Display from './components/Display'


const App = () => {
  
  return(
    <div>
      <ContextProvider>
        <h1>Punch An Ork</h1>
        <Display />
        <Game />
      </ContextProvider>
    </div>
  )
}

export default App;


