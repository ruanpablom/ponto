import { HTMLAttributes } from 'react';

export interface NavigationDrawerProps extends HTMLAttributes<HTMLElement> {
  isOpen: boolean;
  onClose: () => void;
}
