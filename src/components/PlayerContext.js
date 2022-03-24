import { createContext, useState } from "react";
import ROLES from './roles';

const PlayerContext = createContext();

export function ContextProvider({ children }) {
  let player = {...ROLES['guardsmen(trooper)']};
  let computer = {...ROLES['boy(fighter)']};

  const [ playerAtk, togglePlayerAtk ] = useState(false);
  const [ enemyAtk, toggleEnemyAtk ] = useState(false);

  const [playerDmg, setPlayerDmg] = useState(0);
  const [enemyDmg, setEnemyDmg] = useState(0);

  const [ playerDeath, togglePlayerDeath ] = useState(false);
  const [ enemyDeath, toggleEnemyDeath ] = useState(false);
  const [ entered, enterScene ] = useState(false);

  const [ computerHealth, setComputerHealth ] = useState(computer.stats.wounds);
  const [ playerHealth, setPlayerHealth ] = useState(player.stats.wounds);

  const maxComputerHealth = computer.stats.wounds;
  const maxPlayerHealth = player.stats.wounds;

  let exportObj = {
    entered,
    enterScene,
    playerDmg,
    setPlayerDmg,
    enemyDmg, 
    setEnemyDmg,
    playerAtk, 
    playerDeath,
    togglePlayerAtk, 
    togglePlayerDeath, 
    enemyAtk, 
    enemyDeath,
    toggleEnemyAtk,
    toggleEnemyDeath,
    computerHealth, 
    setComputerHealth, 
    playerHealth, 
    setPlayerHealth, 
    maxComputerHealth, 
    maxPlayerHealth
  };

  return (
    <PlayerContext.Provider value={exportObj}>
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerContext;