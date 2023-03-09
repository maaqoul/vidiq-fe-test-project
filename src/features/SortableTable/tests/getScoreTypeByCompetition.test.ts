import { ECompetition } from '../../../entities/Keywords';
import { getScoreTypeByCompetition } from '../helpers';

describe('getScoreTypeByCompetition', () => {
  it('should return "orange" for LOW competition', () => {
    expect(getScoreTypeByCompetition(ECompetition.LOW)).toEqual('orange');
  });

  it('should return "yellow" for MEDIUM competition', () => {
    expect(getScoreTypeByCompetition(ECompetition.MEDIUM)).toEqual('yellow');
  });

  it('should return "light-green" for HIGH competition', () => {
    expect(getScoreTypeByCompetition(ECompetition.HIGH)).toEqual('light-green');
  });

  it('should return "green" for VERY_HIGH competition', () => {
    expect(getScoreTypeByCompetition(ECompetition.VERY_HIGH)).toEqual('green');
  });

  it('should return "red" for VERY_LOW competition', () => {
    expect(getScoreTypeByCompetition(ECompetition.VERY_LOW)).toEqual('red');
  });
});
