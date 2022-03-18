import { useState, useContext } from 'react'
import ROLES from './roles'
import PlayerContext from './PlayerContext'


const Game = () => {

  let player = {...ROLES['guardsmen(trooper)']};
  let computer = {...ROLES['boy(fighter)']}

  const { setPlayerPos } = useContext(PlayerContext);
  const { setEnemyPos } = useContext(PlayerContext);

  const [ playerHand, setPlayerHand ] = useState([])
  const [ computerHand, setComputerHand] = useState([])

  const [ computerHealth, setComputerHealth ] = useState(computer.stats.wounds)
  const [ playerHealth, setPlayerHealth ] = useState(player.stats.wounds)
  
  const [ diToAct, setDiToAct ] = useState('')

  const [ turnTracker, setTurnTracker ] = useState('Roll')

  const [ playerGoneThisRound, setPlayerGoneThisRound ] = useState(false)
  const [ winTracker, setWinTracker ] = useState({player: 0, computer: 0})

  const playerAttackAnim = () => {
    setPlayerPos(true);
  }

  const enemyAttackAnim = () => {
    setEnemyPos(true);
  }

  const rollDice = () => {    
    setPlayerHand('x'.repeat(player.weapons.attacks).split('').map(_element => Math.ceil(Math.random() * 6)))
    setComputerHand('x'.repeat(player.weapons.attacks).split('').map(_element => Math.ceil(Math.random() * 6)))
    
    setTurnTracker('RemoveFails')
  }

  const CleanHands = () => {
    setPlayerHand(playerHand.filter(element => element >= player.weapons.weapon_skill))
    setComputerHand(computerHand.filter(element => element >= computer.weapons.weapon_skill))
    
    console.log(playerHand)
    setTurnTracker('TurnController')
  }

  const RollButton = () => {
    let name = 'Roll';

    return (
      <button onClick={rollDice}>{name}</button>
    )
  }

  const CleanHandButton = () => {
    let name = 'Remove Fails';

    return (
      <button onClick={CleanHands}>{name}</button>
    )
  }

  const handleDiceButtons = (di) => {
    setDiToAct(di)
    setPlayerHand(playerHand.slice(0, playerHand.indexOf(+di)).concat(playerHand.slice(playerHand.indexOf(+di) + 1, playerHand.length)))
  }

  const DiceButtons = () => {
    return (
        <div>
          {playerHand.map((di, index) =>
            <li key={index}>
              <button onClick={() => handleDiceButtons(di)}>{String.fromCharCode(9855 + di)}</button>
            </li>
        )}
        </div>
    )
  }

  const Attack = () => {
    playerAttackAnim();
    if (6 === +diToAct) {
      setComputerHealth(computerHealth - player.weapons.damage.critical < 0 ? 0 : computerHealth - player.weapons.damage.critical)
      
      if (computerHand.length === 0) {
        setTurnTracker('Player')
      } else {
        setTurnTracker('Computer')
      }

      if (playerHand.length === 0 && computerHand.length === 0) {
        setTurnTracker('Roll')
      }

    } else {
      setComputerHealth(computerHealth - player.weapons.damage.regular < 0 ? 0 : computerHealth - player.weapons.damage.regular)
        
      if (computerHand.length === 0) {
        setTurnTracker('Player')
      } else {
        setTurnTracker('Computer')
      }

      if (playerHand.length === 0 && computerHand.length === 0) {
        setTurnTracker('Roll')
      }
    }

    setDiToAct('')
    setPlayerGoneThisRound(true)
    
    setTurnTracker('TurnController')
  }

  const Parry = () => {
    if (6 === +diToAct) {
      if (computerHand.includes(6)) {
        setComputerHand(computerHand.slice(0, computerHand.indexOf(6)).concat(computerHand.slice(computerHand.indexOf(6) + 1, computerHand.length)))
      } else {
        let di = computerHand.find(element => element !== 6)
        setComputerHand(computerHand.slice(0, computerHand.indexOf(di)).concat(computerHand.slice(computerHand.indexOf(di) + 1, computerHand.length)))
      }
    } else {
      let di = computerHand.find(element => element !== 6)
      setComputerHand(computerHand.slice(0, computerHand.indexOf(di)).concat(computerHand.slice(computerHand.indexOf(di) + 1, computerHand.length)))
    }
    setDiToAct('')
    setPlayerGoneThisRound(true)
    
    setTurnTracker('TurnController')

  }

  const Run = () => {
  }


  const ChooseActionButtons = () => {
    return (
      <div>
        { diToAct === '' ? '' : String.fromCharCode(9855 + diToAct)}
        <button onClick={Attack}>Attack</button>
        {diToAct <= 5 && computerHand.every(element => element === 6) || computerHand.length === 0 ? '' : <button onClick={Parry}>Parry</button>} 
        <button onClick={Run}>Run</button>
      </div>

    )
  }

  const ComputerActionButton = () => {
    return (
      <button onClick={ComputerActs}>Computer Acts</button>
    )
  }

  const ContinueRoundButton = () => {
    return (
      <button onClick={TurnController}>Continue</button>
    )
  }


  const ComputerActs = () => {     
    if ((playerHand.every(element => element === 6) && (computerHand.every(element => element < 6))) || (playerHealth <= computer.weapons.damage.critical) || 
      (computerHealth > player.weapons.damage.critical) || playerHand.length === 0) {
      if (computerHand.includes(6)) {
        setPlayerHealth(playerHealth - computer.weapons.damage.critical < 0 ? 0 : playerHealth - computer.weapons.damage.critical);
        setComputerHand(computerHand.slice(0, computerHand.indexOf(6))
          .concat(computerHand.slice(computerHand.indexOf(6) + 1, computerHand.length)))
      } else {
        setPlayerHealth(playerHealth - computer.weapons.damage.regular < 0 ? 0 : playerHealth - computer.weapons.damage.regular);
        let di = computerHand.find(element => element !== 6)
        setComputerHand(computerHand.slice(0, computerHand.indexOf(di))
          .concat(computerHand.slice(computerHand.indexOf(di) + 1, computerHand.length)))
      }
      enemyAttackAnim();
      console.log('Computer Attacked') //used to see action Ork took in console when debugging
    } else {
      let diceToParry;
      let parriedDice;
      
      if (computerHealth === player.weapons.damage.critical && playerHand.includes(6) && computerHand.includes(6)) { //Issue With Ork Parry (Invalid Parry)
        diceToParry = 6;
        parriedDice = 6;
      } else {
        diceToParry = computerHand.find(element => element !== 6)
        parriedDice = playerHand.find(element => element !== 6)
      }

      console.log('Computer Parried') //used to see action Ork took in console when debugging

      setComputerHand(computerHand.slice(0, computerHand.indexOf(diceToParry))
        .concat(computerHand.slice(computerHand.indexOf(diceToParry) + 1, computerHand.length)))
      setPlayerHand(playerHand.slice(0, playerHand.indexOf(parriedDice))
        .concat(playerHand.slice(playerHand.indexOf(parriedDice) + 1, playerHand.length)))
    }

    setPlayerGoneThisRound(false)

    setTurnTracker('TurnController')


  }

  const TurnController = () => {
    if (playerHealth <= 0) {
      setWinTracker(prevState => {
        return { ...prevState, computer: prevState.computer + 1 }
      })

      
      setPlayerHand([])
      setComputerHand([])
      // setComputerHealth(computer.stats.wounds) **Prevents Reset of Health Each Round
      setPlayerHealth(player.stats.wounds)
      setPlayerGoneThisRound(false)
      setTurnTracker('Roll')
    } else if (computerHealth <= 0) {
      setWinTracker(prevState => {
        return { ...prevState, player: prevState.player + 1 }
      })

      setPlayerHand([])
      setComputerHand([])
      setComputerHealth(computer.stats.wounds)
      // setPlayerHealth(player.stats.wounds) **Prevents Reset of Health Each Round
      setPlayerGoneThisRound(false)
      setTurnTracker('Roll')
    } else if((playerHand.length === 0) && (computerHand.length === 0)) { 
      setTurnTracker('Roll')
      setPlayerGoneThisRound(false)
    } else if (playerHand.length === 0) {
    setTurnTracker('Computer');
    } else if (computerHand.length === 0) {
      setTurnTracker('Player');
    } else if (playerGoneThisRound) {
      setTurnTracker('Computer');
    } else {
      setTurnTracker('Player');
    }
  }

  const DisplayCurrentButtons = () => {
    if (turnTracker === 'Roll') {
      return (
        <RollButton/>
      )
    } else if (turnTracker === 'RemoveFails') {
      return (
        <CleanHandButton />
      )
    } else if (turnTracker === 'Player') {
      if (diToAct === '') {
        return (
          <DiceButtons />
        )
      } else {
        return (
          <ChooseActionButtons />
        )
      }
    } else if (turnTracker === 'Computer') {
      
      return (
        <ComputerActionButton />
      )
    } else if (turnTracker === 'TurnController') {
      
      return (
        <ContinueRoundButton />
      )
    }
  }
    
  return(
    <div>
        <p>Player Health: {playerHealth} || Ork Health: {computerHealth}</p>
        <p>Player Dice: {playerHand} || Ork Dice: {computerHand}</p>
        <DisplayCurrentButtons />
        {/* button for testing */}
        {/* <button onClick={playerAttackAnim}>attck</button> */}
        <p>Orks Killed: {winTracker.player} || Guardsmen Lost: {winTracker.computer} || Win Rate: { winTracker.computer === 0 ? 0 : Math.round((winTracker.player / winTracker.computer) * 100)}%</p>
    </div>
  )

}

export default Game;


