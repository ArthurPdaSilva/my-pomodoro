import React, { useCallback, useState } from 'react';
import play from '../assets/play.png';
import { Timer } from './Timer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sound = new Audio(require('../sounds/bell-sound.mp3'));

export function Pomodoro() {
  const [count, setCount] = useState(0);
  const [working, setWorking] = useState(false);
  const [paused, setPaused] = useState(true);
  const [start, setStart] = useState(true);

  const handleToggleValue = useCallback(() => {
    if (count >= 2) setCount(0);
    else setCount(count + 1);
  }, [count, setCount]);

  const handlePlay = useCallback(() => {
    if (start) setStart(false);
    if (!working && paused) {
      document.body.classList.add('work');
      sound.play();
      setPaused(false);
    } else {
      document.body.classList.remove('work');
      setPaused(true);
    }
    setWorking(!working);
  }, [
    count,
    setCount,
    working,
    setWorking,
    paused,
    setPaused,
    start,
    setStart,
  ]);

  const handleReset = useCallback(() => {
    if (!start) setStart(true);
    setPaused(true);
    setWorking(false);
  }, [
    count,
    setCount,
    working,
    setWorking,
    paused,
    setPaused,
    start,
    setStart,
  ]);

  return (
    <div className="container">
      <h1>Pomodoro</h1>
      <div className="pomodoro">
        {start ? (
          <>
            <img src={play} onClick={() => handlePlay()} />
            <button
              title="Clique-me para trocar o modo"
              onClick={() => handleToggleValue()}
            >
              ⬇ Work ⬇
            </button>
          </>
        ) : (
          <Timer isPaused={paused} restart={start} sound={sound} />
        )}
      </div>
      <div className="buttonGroup">
        <button onClick={() => handlePlay()}>
          {!working ? 'Resume' : 'Pause'}
        </button>
        <button onClick={() => handleReset()}>Reset</button>
      </div>
    </div>
  );
}
