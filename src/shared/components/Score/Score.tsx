import './Score.scss';

import clsx from 'clsx';
import { FC } from 'react';
import { ScoreType } from '../../types';

type ScoreProps = {
  score: number;
  type: ScoreType;
};

const Score: FC<ScoreProps> = ({ score, type }) => {
  return <div className={clsx('score', type)}>{score}</div>;
};

export default Score;
