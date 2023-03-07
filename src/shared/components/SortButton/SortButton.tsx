import './SortButton.scss';

import clsx from 'clsx';
import { FC } from 'react';
import { CustomButtonProps } from '../../types';
import SortIcon from '../icons/SortIcon';

const SortButton: FC<CustomButtonProps> = ({
  title,
  icon,
  onClick,
  onKeyDown,
  tabIndex,
  className,
  id,
  ...otherProps
}) => {
  return (
    <div
      {...otherProps}
      id={id}
      role='button'
      className={clsx('btn btn-sort', className)}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex ?? -1}
    >
      {title && <div className='btn-sort-title'>{title}</div>}
      {icon || <SortIcon />}
    </div>
  );
};

export default SortButton;
