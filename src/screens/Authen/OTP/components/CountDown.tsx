import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react';
import { TextCus } from 'components/TextCus';
import moment from 'moment';
import { AppState, AppStateStatus } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { CountDownProps, CountDownRef } from 'types';
import { TouchCus, ViewCus } from 'components';

const CountDown = forwardRef<CountDownRef, CountDownProps>((props, ref) => {
  const myInterval = useRef<ReturnType<typeof setInterval>>(0);
  const [time, setTimeCount] = useState<string>('00');
  const initialSeconds = useRef(props?.initialSeconds ?? 300);

  let timeUp: any;

  useImperativeHandle(ref, () => ({
    setPause,
    setStart,
  }));

  const setPause = () => {
    clearInterval(myInterval.current);
  };

  const setStart = () => {
    clearInterval(myInterval.current);
    initialSeconds.current = props.initialSeconds;
    caculTime(initialSeconds.current);
    runOnJS(() => {
      countTime();
    })();
  };

  const countTime = () => {
    myInterval.current = setInterval(() => {
      initialSeconds.current -= 1;
      if (initialSeconds.current < 0) {
        props.onTimeup();
        clearInterval(myInterval.current);
      } else {
        caculTime(initialSeconds.current);
      }
    }, 1000);
  };

  const caculTime = (seconds: number) => {
    let timeCacul: string = '00';
    const minutesCacul = seconds;

    let minute: string = `${minutesCacul}`;

    if (minutesCacul < 10) {
      minute = `0${minutesCacul}`;
    }
    timeCacul = minute;
    setTimeCount(timeCacul);
  };

  useEffect(() => {
    const subcrise = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subcrise.remove();
    };
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(myInterval.current);
    };
  }, []);

  useEffect(() => {
    initialSeconds.current = props.initialSeconds;
  }, [props.reset, props.initialSeconds]);

  const onAppResume = () => {
    const ms = timeUp?.diff(moment(new Date()));
    const d = Math.floor(moment.duration(ms).asMinutes() * 60);
    if (d > 0) {
      initialSeconds.current = d;
      caculTime(initialSeconds.current);
    } else {
      initialSeconds.current = 0;
      caculTime(0);
    }
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      onAppResume();
    }
  };
  return (
    <ViewCus flex-row mt-24>
      {props.error ? (
        <TextCus error useI18n mr-4>
          auth.wrong_otp
        </TextCus>
      ) : (
        <TextCus useI18n mr-4>
          auth.expired
        </TextCus>
      )}

      {time === '00' ? (
        <TouchCus onPress={props?.onPressResend}>
          <TextCus useI18n mr-4 bold color-blue47>
            auth.resend
          </TextCus>
        </TouchCus>
      ) : (
        <TextCus bold main>
          {time}s
        </TextCus>
      )}
    </ViewCus>
  );
});

export default CountDown;
