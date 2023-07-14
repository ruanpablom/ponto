/* eslint-disable @typescript-eslint/no-misused-promises */
import alarm from './assets/alarm.wav'
import './App.css'
import { useCallback, useEffect, useRef, useState } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'
import { RecursiveKeyValuePair } from 'tailwindcss/types/config';

const { theme } = resolveConfig(tailwindConfig)

// const POMODORO_TIME = 1000*60*25;
const POMODORO_TIME = 1000*10*1;
const POMODORO_BREAK_TIMES: number[] = [1000*5, 1000*6, 1000*7, 1000*8];
// const POMODORO_BREAK_TIMES: number[] = [1000*60*5, 1000*60*10, 1000*60*15, 1000*60*30];

function App() {
  const [pomodoroTimer, setPomodoroTimer] = useState<number>(POMODORO_TIME);
  const [breakCount, setBreakCount] = useState<number>(0);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  console.log();

  const changeBackgroundColor = (value: boolean) => {
    (document.querySelector(':root') as HTMLElement).style.backgroundColor = value ? (theme?.colors?.blue as RecursiveKeyValuePair<string, string>)["500"] as string : '#ba4949';
  }

  const handleStart = () => {
    setIsCounting(true);
    audioRef?.current?.pause();
  }

  const reloadTimer = useCallback(() => {
    setIsBreak(prev => {
      if(prev){
        setPomodoroTimer(POMODORO_TIME);  
      }else {
        setPomodoroTimer(POMODORO_BREAK_TIMES[breakCount]);
        setBreakCount(prevCount => prevCount >= POMODORO_BREAK_TIMES.length - 1 ? 0 : prevCount + 1);
      }
      changeBackgroundColor(!prev)
      return !prev
    });
  }, [breakCount]);
  
  useEffect(() => {
    let tick: number | undefined;
    
    if(pomodoroTimer > 0 && isCounting) {
      tick = setInterval(() => {
        setPomodoroTimer(prev => prev - 1000);
      }, 1000);
    }else if(pomodoroTimer === 0){
      audioRef?.current?.play().catch(error => console.log(error));
      reloadTimer();
      setIsCounting(false);
    }
    
    return () => clearInterval(tick);
  }, [pomodoroTimer, isCounting, reloadTimer])
  
  const minutes = String(Math.floor((pomodoroTimer % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  const seconds = String(Math.floor((pomodoroTimer % (1000 * 60)) / 1000)).padStart(2, '0');

  document.title = `${minutes}:${seconds} ${isBreak ? 'Break' : 'Focus'}`;
  
  return (
    <div className="flex flex-col bg-white/10 p-10 rounded-xl gap-2 w-80">
      <h1 className='text-3xl font-bold'>POMODORO</h1>
      <h1 className='text-7xl font-bold py-5'>{`${minutes}:${seconds}`}</h1>
      <audio ref={audioRef} src={alarm} autoPlay loop/>
      {
        !isCounting 
        ? (<button className={`shadowButton bg-white font-bold py-2 rounded-md ${isBreak ? 'text-blue-700':'text-red-700'}`} onClick={handleStart}>{!isBreak ? 'FOCUS' : 'BREAK'}</button>) 
        : (<button className={`shadowButton bg-white font-bold py-2 rounded-md ${isBreak ? 'text-blue-700':'text-red-700'}`} onClick={() => setIsCounting(false)}>PAUSE</button>)
      }
    </div>
  )
}

export default App
