import { PomodoroTimer } from '../PomodoroTimer';
import { TodoReact } from '../TodoReact';

export function Pomodoro(): JSX.Element {
  return (
    <div
      id="pomodoro-container"
      className="w-96 flex flex-col gap-4 items-center"
    >
      <PomodoroTimer />
      <TodoReact />
    </div>
  );
}
