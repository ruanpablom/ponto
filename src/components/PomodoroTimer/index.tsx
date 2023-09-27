import { useState, useEffect, useRef, useCallback } from 'react';
import { RecursiveKeyValuePair } from 'tailwindcss/types/config';
import { IoIosRefreshCircle } from 'react-icons/io';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';
import alarm from '../../assets/alarm.wav';

const { theme }: any = resolveConfig(tailwindConfig);

const POMODORO_TIME = 1000 * 60 * 25;
const POMODORO_BREAK_TIMES: number[] = [
  1000 * 60 * 5,
  1000 * 60 * 10,
  1000 * 60 * 15,
  1000 * 60 * 30,
];
// const POMODORO_TIME = 1000 * 10 * 1;
// const POMODORO_BREAK_TIMES: number[] = [1000 * 5, 1000 * 6, 1000 * 7, 1000 * 8];

type PomodoroTimerProps = {
  isBreak: boolean;
  setIsBreak: React.Dispatch<React.SetStateAction<boolean>>;
};

export function PomodoroTimer({
  isBreak,
  setIsBreak,
}: PomodoroTimerProps): JSX.Element {
  // const [isBreak, setIsBreak] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [pomodoroTimer, setPomodoroTimer] = useState<number>(POMODORO_TIME);
  const [_, setBreakCount] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const changeBackgroundColor = useCallback((value: boolean) => {
    /* tslint:disable-next-line */
    (document.querySelector(':root') as HTMLElement).style.backgroundColor =
      value
        ? ((theme?.colors?.blue as RecursiveKeyValuePair<string, string>)[
            '500'
          ] as string)
        : '#ba4949';
  }, []);

  const reloadTimer = useCallback(() => {
    setIsBreak(prev => {
      if (prev) {
        setPomodoroTimer(POMODORO_TIME);
      } else {
        setBreakCount(prevCount => {
          setPomodoroTimer(POMODORO_BREAK_TIMES[prevCount]);
          return prevCount >= POMODORO_BREAK_TIMES.length - 1
            ? 0
            : prevCount + 1;
        });
      }
      changeBackgroundColor(!prev);
      return !prev;
    });
  }, [changeBackgroundColor, setIsBreak]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCounting) {
      interval = setInterval(() => {
        setElapsedTime(prev => {
          console.info(pomodoroTimer - prev, pomodoroTimer, prev);
          if (pomodoroTimer - prev < 1000) {
            setIsCounting(false);
            reloadTimer();
            audioRef?.current?.play().catch(error => console.info(error));
            return 0;
          }
          return Date.now() - startTime!;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCounting, pomodoroTimer, reloadTimer, startTime]);

  const handleStart = () => {
    if (!isCounting) {
      setStartTime(Date.now() - elapsedTime);
      setIsCounting(true);
      audioRef?.current?.pause();
    }
  };

  const handlePause = () => {
    if (isCounting) {
      setIsCounting(false);
      setElapsedTime(Date.now() - startTime!);
    }
  };

  const handleReset = () => {
    setIsCounting(false);
    setStartTime(null);
    setElapsedTime(0);
  };

  const minutes = Math.floor(((pomodoroTimer - elapsedTime) / 1000 / 60) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(((pomodoroTimer - elapsedTime) / 1000) % 60)
    .toString()
    .padStart(2, '0');

  document.title = `${minutes}:${seconds} ${isBreak ? 'Break' : 'Focus'}`;

  return (
    <div className="flex flex-col bg-white/10 p-10 rounded-xl gap-2 w-80">
      <h1 className="text-3xl font-bold">POMODORO</h1>
      <audio ref={audioRef} src={alarm} autoPlay loop>
        <track kind="captions" />
      </audio>
      <h1 className="text-7xl font-bold py-5">{`${minutes}:${seconds}`}</h1>
      <div id="buttons-container" className="flex flex-col items-center gap-4">
        {isCounting ? (
          <button
            className={`shadowButton w-full bg-white font-bold py-2 rounded-md hover:opacity-75 ${
              isBreak ? 'text-blue-700' : 'text-red-700'
            }`}
            type="button"
            onClick={handlePause}
          >
            PAUSE
          </button>
        ) : (
          <button
            className={`shadowButton w-full bg-white font-bold py-2 rounded-md hover:opacity-75 ${
              isBreak ? 'text-blue-700' : 'text-red-700'
            }`}
            type="button"
            onClick={handleStart}
          >
            {isBreak ? 'BREAK' : 'FOCUS'}
          </button>
        )}
        <button type="button" onClick={handleReset}>
          <IoIosRefreshCircle
            className=" fill-white hover:opacity-75"
            size={46}
          />
        </button>
      </div>
    </div>
  );
}
