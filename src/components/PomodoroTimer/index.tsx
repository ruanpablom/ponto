import { useState, useEffect, useRef, useCallback } from 'react';
import { IoIosRefreshCircle } from 'react-icons/io';
import { useConfig } from '@/contexts/config';
import alarm from '../../assets/alarm.wav';

export function PomodoroTimer(): JSX.Element {
  const { alertTime, alertVolume } = useConfig();
  const [isCounting, setIsCounting] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [pomodoroTimer, setPomodoroTimer] = useState<number>(alertTime);
  const audioRef = useRef<HTMLAudioElement>(null);

  const reloadTimer = useCallback(() => {
    setPomodoroTimer(alertTime);
  }, [alertTime]);

  const sendNotification = useCallback(() => {
    if (Notification.permission === 'granted') {
      // eslint-disable-next-line no-new
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('Ponto', {
          body: 'Adicione uma nova atividade e reinicie o timer.',
          icon: '/favicon-32x32',
        });
      });
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCounting) {
      interval = setInterval(() => {
        setElapsedTime(prev => {
          if (pomodoroTimer - prev < 1000) {
            setIsCounting(false);
            reloadTimer();
            audioRef!.current!.volume = alertVolume;
            audioRef?.current?.play().catch(error => console.info(error));
            sendNotification();
            return 0;
          }
          return Date.now() - startTime!;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    isCounting,
    pomodoroTimer,
    reloadTimer,
    startTime,
    alertVolume,
    sendNotification,
  ]);

  useEffect(() => {
    setPomodoroTimer(alertTime);
  }, [alertTime]);

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
    audioRef?.current?.pause();
  };

  const hours = Math.floor(
    ((pomodoroTimer - elapsedTime) / 1000 / 60 / 60) % 24,
  )
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor(((pomodoroTimer - elapsedTime) / 1000 / 60) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(((pomodoroTimer - elapsedTime) / 1000) % 60)
    .toString()
    .padStart(2, '0');

  document.title = `${hours}:${minutes}:${seconds}`;

  return (
    <div className="flex flex-col bg-white/10 p-4 rounded-xl gap-2 w-full">
      <h1 className="text-3xl font-bold">PONTO</h1>
      <audio ref={audioRef} src={alarm} autoPlay loop>
        <track kind="captions" />
      </audio>
      <h1 className="text-4xl font-bold py-5">{`${hours}:${minutes}:${seconds}`}</h1>
      <div
        id="buttons-container"
        className="flex flex-col items-center gap-4 text-red-700"
      >
        {isCounting ? (
          <button
            className="shadowButton w-full bg-white font-bold py-2 rounded-md hover:opacity-75"
            type="button"
            onClick={handlePause}
          >
            PAUSAR
          </button>
        ) : (
          <button
            className="shadowButton w-full bg-white font-bold py-2 rounded-md hover:opacity-75"
            type="button"
            onClick={handleStart}
          >
            INICIAR
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
