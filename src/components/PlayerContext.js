import { createContext, useState } from "react";

const PlayerContext = createContext();

export function ContextProvider({ children }) {
  const [ playerPos, setPlayerPos ] = useState(false);
  const [ enemyPos, setEnemyPos ] = useState(false);


  // const movePlayer = () => {
  //   setPlayerPos(playerPos + 200);
  // } 


  return (
    <PlayerContext.Provider value={{playerPos, setPlayerPos, enemyPos, setEnemyPos}}>
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerContext;