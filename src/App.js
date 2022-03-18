import { useState } from 'react'
import {ContextProvider} from './PlayerContext'
import Game from './Game'
import Display from './Display'


const App = () => {
  
  return(
    <div>
      <ContextProvider>
        <Display />
        <Game />
      </ContextProvider>
    </div>
  )
}

export default App;


