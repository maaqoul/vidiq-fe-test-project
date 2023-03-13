import './Spin.scss';

import { clsx } from 'clsx';
import { type FC } from 'react';

type SpinnerProps = {
  size: 'small' | 'medium' | 'large';
  classNames?: string;
};

export const Spinner: FC<SpinnerProps> = ({ size = 'medium', classNames }) => (
  <div className={clsx('loader', size, classNames)} />
);
