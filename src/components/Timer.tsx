import React, { useCallback, useEffect, useState } from 'react';
import { useInterval } from '../hooks/intertaval';
import { FormattedTime } from '../utils/TimeFormat';

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
    else if (time === 0 && rest) startCounting(1500, -1, false);
    else if (time <= 0 && cycle < 3) startCounting(300, cycle + 1);
    else startCounting(600, 0);
  }, [time, rest]);

  const startCounting = useCallback(
    (count: number, cyclesCount: number, restValue = true) => {
      setTime(count);
      if (cyclesCount !== -1) setCycle(cyclesCount);
      setRest(restValue);
      props.sound.play();
    },
    [setTime, setCycle, setRest],
  );

  useInterval(
    () => {
      setTime(time - 1);
    },
    !props.isPaused ? 1000 : null,
  );

  return <span className="timer">{FormattedTime(time)}</span>;
}
