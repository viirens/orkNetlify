import { createContext, useState } from "react";
import ROLES from './roles'

const PlayerContext = createContext();

export function ContextProvider({ children }) {
  let player = {...ROLES['guardsmen(trooper)']};
  let computer = {...ROLES['boy(fighter)']}

  const [ playerPos, setPlayerPos ] = useState(false);
  const [ enemyPos, setEnemyPos ] = useState(false);

  const [ computerHealth, setComputerHealth ] = useState(computer.stats.wounds)
  const [ playerHealth, setPlayerHealth ] = useState(player.stats.wounds)
  const maxComputerHealth = computer.stats.wounds;
  const maxPlayerHealth = player.stats.wounds;

  let exportObj = {playerPos, setPlayerPos, enemyPos, setEnemyPos, computerHealth, setComputerHealth, playerHealth, setPlayerHealth, maxComputerHealth, maxPlayerHealth};

  return (
    <PlayerContext.Provider value={exportObj}>
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerContext;