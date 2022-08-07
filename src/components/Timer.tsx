import React, { useEffect, useState } from 'react';
import { useInterval } from '../hooks/intertaval';
import { FormattedTime } from '../utils/format-time';

type PropsProtocol = {
  timeMode: 'Work' | 'Short Break' | 'Long Break';
  working?: boolean;
};

export function Timer(props: PropsProtocol) {
  const [time, setTime] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (props.timeMode === 'Work') setTime(1500);
    else if (props.timeMode === 'Long Break') setTime(900);
    else setTime(300);
  }, [props.timeMode, setTime]);
  useInterval(() => {
    setTime(time - 1);
  }, 1000);

  return <span className="timer">{FormattedTime(time)}</span>;
}
