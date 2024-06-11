import { useEffect, useRef, useState } from 'react';
import { ICountDownProps, ITimer } from 'types';

export const useCountDown = ({ start, fps }: ICountDownProps): ITimer => {
  const [timer, setTimer] = useState(start || 0);
  const intervalRef = useRef<any>();

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const startTimer = (time: number) => {
    setTimer(time);
  };

  useEffect(() => {
    if (timer <= 0) {
      return stopTimer();
    }
    intervalRef.current = setInterval(() => {
      setTimer(t => t - 1 / (fps || 1));
    }, 1000 / (fps || 1));
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer]);

  return { timer, startTimer, stopTimer };
};
