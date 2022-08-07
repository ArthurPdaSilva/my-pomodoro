import React, { useCallback, useState } from 'react';
import play from '../assets/play.png';
import { Timer } from './Timer';

export function Pomodoro() {
  const [mode, setMode] = useState(['Work', 'Short Break', 'Long Break']);
  const [count, setCount] = useState(0);
  const [option, setOption] = useState(mode[count]);
  const [working, setWorking] = useState(false);

  const handleToggleValue = useCallback(() => {
    if (count >= 2) setCount(0);
    else setCount(count + 1);
  }, [count, setCount]);

  const handlePlay = useCallback(() => {
    if (!working) {
      setOption(mode[count]);
      setCount(0);
    }
    setWorking(!working);
  }, [mode, count, setCount, setOption, working, setWorking]);

  return (
    <div className="container">
      <h1>Pomodoro</h1>
      <div className="pomodoro">
        {!working ? (
          <>
            <img src={play} onClick={() => handlePlay()} />
            <button
              title="Clique-me para trocar o modo"
              onClick={() => handleToggleValue()}
            >
              {mode[count]} ⬇
            </button>
          </>
        ) : (
          <Timer timeMode={option as 'Work' | 'Short Break' | 'Long Break'} />
        )}
      </div>
      <div className="buttonGroup">
        <button onClick={() => handlePlay()}>
          {!working ? 'Resume' : 'Pause'}
        </button>
        <button>Reset</button>
      </div>
    </div>
  );
}
