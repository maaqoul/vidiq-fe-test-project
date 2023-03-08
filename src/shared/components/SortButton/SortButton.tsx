import './SortButton.scss';

import clsx from 'clsx';
import { FC, ReactElement } from 'react';
import { Button, ButtonProps } from '../Button';
import SortIcon from '../icons/SortIcon';

const SortButton: FC<
  ButtonProps & {
    title: string;
    icon?: ReactElement;
  }
> = ({ title, icon, className, ...otherProps }) => (
  <Button {...otherProps} className={clsx('btn-sort', className)}>
    {title && <div className='btn-sort-title'>{title}</div>}
    {icon || <SortIcon />}
  </Button>
);

export default SortButton;
