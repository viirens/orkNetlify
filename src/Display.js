import { useContext, useEffect, useRef } from 'react'
import { ReactP5Wrapper } from "react-p5-wrapper"
import PlayerContext from './PlayerContext';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// function Counter() {
//   let [count, setCount] = useState(0);

//   useInterval(() => {
//     // Your custom logic here
//     setCount(count + 1);
//   }, 1000);

//   return <h1>{count}</h1>;
// }

function sketch(p5) {
  let playerPos = 100;

  

  p5.setup = () => p5.createCanvas(600, 400);


  function playerAttack(val) {
    let counter = 0;
    let myInterval = setInterval(() => {
      counter++;
      if (playerPos < val) playerPos += 5;
      if (playerPos = val) playerPos -= 5;

      if (playerPos < 100) clearInterval(myInterval);
    }, 5);
    console.log('hi');
    
  }

  p5.updateWithProps = props => {
    if (props.playerPos) {
  
      playerAttack(props.playerPos);
      // playerPos = props.playerPos;
    } 

  };

  p5.draw = () => {
    p5.background(51);
    p5.fill(255);
    p5.rect(playerPos,100,100,200);
    p5.fill(0,255,0);
    p5.rect(400,100,100,200);
    p5.text(`playerPos: ${playerPos}`,10,10 );
  };

}

const Display = (props) => {
  const { playerPos, setPlayerPos } = useContext(PlayerContext);
  
  return (
    <>
      <ReactP5Wrapper sketch={sketch} playerPos={playerPos}/>
    </>
  )
}

export default Display;