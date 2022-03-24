import React, { useContext, useState, useRef, useEffect} from 'react';
import { useSpring, animated } from 'react-spring';
import PlayerContext from './PlayerContext';
import '../styles/display.css';


const HealthBar = (props) => {

  const { computerHealth, playerHealth, maxComputerHealth, maxPlayerHealth } = useContext(PlayerContext);
  const [ percentFull, setPercentFull ] = useState(false);

  const health = props.entity === 'player' ? playerHealth : computerHealth;
  const maxHealth = props.entity === 'player' ? maxPlayerHealth: maxComputerHealth;
  const mainStyle = props.entity === 'player' ? "health": "health enemyHealth";

  const ref = useRef(null);

  useEffect(() => {
    let outerHeight = ref.current.clientHeight;
    let percentage  = Math.floor((health / maxHealth) * outerHeight);
    setPercentFull(percentage);
  }, [health, maxHealth]);

  const textProps = useSpring({ height: health, delay: 1500 });
  const fillProps = useSpring({ height: percentFull ? percentFull : 0, delay: 1500});

  return (
      <div className={mainStyle} ref={ref}>
        <animated.div className="fill" style={fillProps} />
        <animated.div className="content">{textProps.height.to(x => x.toFixed(0))}</animated.div>
      </div>
  );
}

const DamageReadout = (props) => {
  const { playerAtk, enemyAtk } = useContext(PlayerContext);
  const { playerDmg, enemyDmg } = useContext(PlayerContext);

  let readout = props.class === "playerDmg" ? playerDmg : enemyDmg;
  let attacking = props.class === "playerDmg" ? playerAtk : enemyAtk;

  const style = useSpring({
    from: { 
      opacity: attacking ? 1 : 0, 
      transform: 'translateY(0px)' ,
    },
    to: { 
      opacity: 0, 
      transform: attacking ? 'translateY(-50px)' : 'translateY(0px)',
    },
    config: {
      duration: 700
    },
    delay: 500,
    reset: true,
  })

  return <animated.div style={style} className={props.class}>{readout}</animated.div>
}

const Player = (props) => {
  const { enterScene } = useContext(PlayerContext);

  useEffect(() => { 
    enterScene(true);
  });
  
  return <animated.div style={props.style} className="player"></animated.div>;
}

const Enemy = (props) => {
  return <animated.div style={props.style} className="ork" ></animated.div>;
}


const Display = () => {
  const ref = useRef(null);
  const [ distance, setDistance ] = useState(false);

  useEffect(() => {
    setDistance(ref.current.clientWidth * .28);
  })

  const { playerAtk, togglePlayerAtk, playerDeath, togglePlayerDeath } = useContext(PlayerContext);
  const { enemyAtk, toggleEnemyAtk, enemyDeath, toggleEnemyDeath } = useContext(PlayerContext);
  const { entered } = useContext(PlayerContext);

  const translate = (element) => {
    if (element === 'player') {
      if (playerDeath) {
        return `translateX(-400px)`;
      }
  
      else if (playerAtk) {
        return `translate(${distance}px)`;
      }
    } else if (element === 'enemy') {
      if (enemyDeath) {
        return `translateX(400px)`;
      }

      else if (enemyAtk) {
        return `translate(-${distance}px)`;
      }
    }
    return `translateX(0px)`;
  }

  const toggle = () => {
    if (playerAtk) togglePlayerAtk(false);
    else if (playerDeath) togglePlayerDeath(false);
    else if (enemyAtk) toggleEnemyAtk(false);
    else if (enemyDeath) toggleEnemyDeath(false);
  }

  const playerAnim = useSpring({
    from: {
      transform: !entered ? `translate(-400px)` : `translate(0px)`,
    },
    to: {
      transform: translate('player'),
    },
    
    onRest: () => toggle(),
    config: {
      mass: 2,
    },
  });

  const enemyAnim = useSpring({
    from: {
      transform: !entered ? `translate(400px)` : `translate(0px)`,
    },
    to: {
      transform: translate('enemy'),
    },
    
    onRest: () => toggle(),
    config: {
      mass: 2,
    },
  });
  
  return (
    <div className="viewPort" ref={ref}>
      <HealthBar entity='player'/>
      <DamageReadout class='playerDmg'/>
      <Player style={ {...playerAnim} }  />
      <Enemy style={ {...enemyAnim} }  />
      <DamageReadout class='enemyDmg'/>
      <HealthBar entity='enemy'/>
    </div>
  );
}

export default Display;