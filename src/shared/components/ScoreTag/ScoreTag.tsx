import './ScoreTag.scss';

import clsx from 'clsx';
import { FC } from 'react';
import { ScoreTagType } from '../../types';

type ScoreTagProps = {
  score: number;
  type: ScoreTagType;
};

const ScoreTag: FC<ScoreTagProps> = ({ score, type }) => {
  return <div className={clsx('score-tag', type)}>{score}</div>;
};

export default ScoreTag;
