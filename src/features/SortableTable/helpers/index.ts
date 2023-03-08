// TODO: Based on the layout, it is necessary to be oriented by the competition field

import { ECompetition } from '../../../entities/Keywords';

// TODO: It is necessary to clarify the boundaries and processing rules for the field overall_score!
export const getScoreTypeByCompetition = (competition: ECompetition) => {
  switch (competition) {
    case ECompetition.LOW:
      return 'orange';
    case ECompetition.MEDIUM:
      return 'yellow';
    case ECompetition.HIGH:
      return 'light green';
    case ECompetition.VERY_HIGH:
      return 'green';
    case ECompetition.VERY_LOW:
    default: {
      return 'red';
    }
  }
};
