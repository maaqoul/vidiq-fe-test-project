import './Spin.scss';

import { clsx } from 'clsx';
import { FC } from 'react';

type SpinnerProps = {
  size: 'small' | 'medium' | 'large';
  classNames: string;
};

const Spinner: FC<SpinnerProps> = ({ size = 'medium', classNames }) => (
  <div className={clsx('loader', size, classNames)} />
);

export default Spinner;
