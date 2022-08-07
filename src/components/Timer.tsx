import React, { useEffect, useState } from 'react';
import { useInterval } from '../hooks/intertaval';
import { FormattedTime } from '../utils/format-time';

type PropsProtocol = {
  isPaused: boolean;
  restart: boolean;
  sound: HTMLAudioElement;
};

export function Timer(props: PropsProtocol) {
  const [time, setTime] = useState(1500);
  const [cycle, setCycle] = useState(0);
  const [rest, setRest] = useState(false);

  useEffect(() => {
    if (props.restart) setTime(1500);
    else if (time > 0) return;
    else if (time === 0 && rest) {
      setTime(1500);
      setRest(false);
      props.sound.play();
    } else if (time <= 0 && cycle < 3) {
      setTime(300);
      setCycle(cycle + 1);
      setRest(true);
      props.sound.play();
    } else {
      setTime(900);
      setCycle(0);
      setRest(true);
      props.sound.play();
    }
  }, [time, setTime, setRest, rest]);

  useInterval(
    () => {
      setTime(time - 1);
    },
    !props.isPaused ? 1000 : null,
  );

  return <span className="timer">{FormattedTime(time)}</span>;
}
