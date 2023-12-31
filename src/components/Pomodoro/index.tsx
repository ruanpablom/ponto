import { PomodoroTimer } from '../PomodoroTimer';
import { TodoReact } from '../TodoReact';

export function Pomodoro(): JSX.Element {
  return (
    <div
      id="pomodoro-container"
      className="w-72 flex flex-col gap-4 items-center"
    >
      <PomodoroTimer />
      <div className="w-full">
        <TodoReact />
      </div>
    </div>
  );
}
