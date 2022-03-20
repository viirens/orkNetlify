import React, { useContext, useState, useRef, useEffect} from 'react';
import { useSpring, animated } from 'react-spring';
import PlayerContext from './PlayerContext';
import '../styles/display.css';


const HealthBar = (props) => {

  const { computerHealth, playerHealth, maxComputerHealth, maxPlayerHealth } = useContext(PlayerContext);
  const [ percentFull, setPercentFull ] = useState(false);

  const health = props.entity === 'player' ? playerHealth : computerHealth;
  const maxHealth = props.entity === 'player' ? maxPlayerHealth: maxComputerHealth;
  const mainStyle = props.entity === 'player' ? "main": "main enemyMain";

  const ref = useRef(null);

  useEffect(() => {
    let outerHeight = ref.current.clientHeight;
    let percentage  = Math.floor((health / maxHealth) * outerHeight);
    setPercentFull(percentage);
  }, [health, maxHealth]);

  const textProps = useSpring({ height: health });
  const fillProps = useSpring({ height: percentFull ? percentFull : 0 });

  return (
      <div className={mainStyle} ref={ref}>
        <animated.div className="fill" style={fillProps} />
        <animated.div className="content">{textProps.height.to(x => x.toFixed(0))}</animated.div>
      </div>
  );
}


const Display = () => {

  const { playerPos, setPlayerPos, enemyPos, setEnemyPos } = useContext(PlayerContext);

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
  

  return (
    <div className="viewPort">
      <HealthBar entity='player'/>
      <animated.div style={{...playerAttack }} className="player">player</animated.div>
      <animated.div style={{...enemyAttack }} className="ork" >ork</animated.div>
      <HealthBar entity='enemy'/>
    </div>
  );
}

export default Display;