import './Button.scss';

import clsx from 'clsx';
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  KeyboardEvent,
  MouseEvent,
  // ReactElement,
  TouchEvent,
} from 'react';

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    React.AriaAttributes {
  // title?: string;
  // icon?: ReactElement;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  disabled,
  className,
  onClick,
  onKeyDown,
  children,
  ...props
}) => {
  const handleClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent> | TouchEvent<HTMLDivElement>,
  ) => {
    const mouseEvent = event as MouseEvent<HTMLDivElement>;
    if (!disabled && onClick) {
      onClick(mouseEvent);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!disabled && onKeyDown) {
      onKeyDown(event);
    }
  };

  return (
    <div
      {...props}
      className={clsx('btn', className, disabled && 'is-disabled')}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role='button'
    >
      {children}
    </div>
  );
};
