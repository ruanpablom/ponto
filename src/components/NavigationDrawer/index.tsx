import { ChangeEvent } from 'react';
import { useConfig } from '@/contexts/config';
import { GrFormClose } from 'react-icons/gr';
import { NavigationDrawerProps } from './types';

import './index.css';

export function NavigationDrawer({
  className,
  isOpen,
  onClose,
}: NavigationDrawerProps): JSX.Element {
  const { alertTime, setAlertTime } = useConfig();

  const handleSetAlertTime = (el: ChangeEvent<HTMLInputElement>) => {
    const timeString = el.target.value;
    const timeArray = timeString.split(':');
    const alertTimeInSeconds =
      Number(timeArray[0]) * 60 * 60 * 1000 + Number(timeArray[1]) * 60 * 1000;
    localStorage.setItem('alertTime', alertTimeInSeconds.toString());
    setAlertTime(
      Number(timeArray[0]) * 60 * 60 * 1000 + Number(timeArray[1]) * 60 * 1000,
    );
  };

  const alertTimeString = `${String(
    Math.floor((alertTime / 1000 / 60 / 60) % 24),
  ).padStart(2, '0')}:${String(
    Math.floor((alertTime / 1000 / 60) % 60),
  ).padStart(2, '0')}`;

  return (
    <nav
      className={`absolute top-0 px-6 py-2 flex flex-col gap-4 h-screen bg-red-900 w-fit ease-in-out duration-300 text-white text-xl z-10 font-normal ${className} ${
        isOpen ? 'left-0' : '-left-72'
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        className="text-sm font-bold text-white"
      >
        <GrFormClose size={26} className="icon" />
      </button>

      <ul className="flex flex-col gap-4">
        <li className="text-center flex flex-col">
          <span>TEMPO ALERTA</span>
          <input
            className=" bg-white p-1 text-black border-black"
            type="time"
            onChange={handleSetAlertTime}
            defaultValue={alertTimeString}
          />
        </li>
      </ul>
    </nav>
  );
}
