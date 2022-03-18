import React, { useContext } from 'react'
import { useSpring, animated } from 'react-spring'
import PlayerContext from './PlayerContext'
import '../styles/display.css'

const Display = () => {

  const { playerPos, setPlayerPos } = useContext(PlayerContext);
  const { enemyPos, setEnemyPos } = useContext(PlayerContext);

  const playerAttack = useSpring({
    from: {
      transform: `translate(0px)`,
    },
    to: {
      transform: playerPos ? `translate(120px)` :  `translate(0px)`,
    },
    
    onRest: () => setPlayerPos(false),
    config: {
      mass: 2,
    },
  });

  const enemyAttack = useSpring({
    from: {
      transform: `translate(0px)`,
    },
    to: {
      transform: enemyPos ? `translate(-120px)` :  `translate(0px)`,
    },
    
    onRest: () => setEnemyPos(false),
    config: {
      mass: 2,
    },
  });
  
  // console.log(playerPos);
  return (
    <div className="viewPort">
      <animated.div style={{...playerAttack }} className="player">player</animated.div>
      <animated.div style={{...enemyAttack }} className="ork" >ork</animated.div>
    </div>
  );
}

export default Display;