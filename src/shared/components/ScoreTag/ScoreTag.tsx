import './ScoreTag.scss';

import { clsx } from 'clsx';
import { type FC } from 'react';
import { type IScoreTagType } from '../../types';

type ScoreTagProps = {
  score: number;
  type: IScoreTagType;
};

const ScoreTag: FC<ScoreTagProps> = ({ score, type }) => {
  return <div className={clsx('score-tag', type)}>{score}</div>;
};

export default ScoreTag;
