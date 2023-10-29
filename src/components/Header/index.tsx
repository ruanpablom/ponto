import { IoIosMenu } from 'react-icons/io';

type HeaderProps = {
  openDrawer: () => void;
};

export function Header({ openDrawer }: HeaderProps): JSX.Element {
  return (
    <header className="self-start p-4">
      <IoIosMenu onClick={openDrawer} size={26} />
    </header>
  );
}
