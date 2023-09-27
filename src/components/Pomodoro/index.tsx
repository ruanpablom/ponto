import { useState } from 'react';
import { PomodoroTimer } from '../PomodoroTimer';
import { TodoReact } from '../TodoReact';

export function Pomodoro(): JSX.Element {
  const [isBreak, setIsBreak] = useState<boolean>(false);

  return (
    <div
      id="pomodoro-container"
      className="w-96 flex flex-col gap-4 items-center"
    >
      <PomodoroTimer isBreak={isBreak} setIsBreak={setIsBreak} />
      <TodoReact color={isBreak ? 'blue-700' : 'red-700'} />
    </div>
  );
}
