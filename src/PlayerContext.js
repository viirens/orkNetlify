import { createContext, useState } from "react";

const PlayerContext = createContext();

export function ContextProvider({ children }) {
  const [ playerPos, setPlayerPos ] = useState(100);

  // const movePlayer = () => {
  //   setPlayerPos(playerPos + 200);
  // } 


  return (
    <PlayerContext.Provider value={{playerPos, setPlayerPos}}>
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerContext;