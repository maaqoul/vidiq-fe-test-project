import { getSortedKeywordsByOrder } from '../helpers';
import { ECompetition, EKeywordKeys, ESortOrderBy, type IKeywordItem } from '../types';

const keywordsMockDB = [
  {
    id: 1,
    keyword: 'Ronstring',
    search_volume: 54305480,
    competition: ECompetition.HIGH,
    overall_score: 6,
  },
  {
    id: 2,
    keyword: 'Konklux',
    search_volume: 16547286,
    competition: ECompetition.LOW,
    overall_score: 44,
  },
  {
    id: 3,
    keyword: 'Biodex',
    search_volume: 11543253,
    competition: ECompetition.MEDIUM,
    overall_score: 69,
  },
  {
    id: 4,
    keyword: 'Temp',
    search_volume: 38419228,
    competition: ECompetition.LOW,
    overall_score: 8,
  },
  {
    id: 5,
    keyword: 'Temp',
    search_volume: 81430849,
    competition: ECompetition.LOW,
    overall_score: 28,
  },
  {
    id: 6,
    keyword: 'Aerified',
    search_volume: 31631238,
    competition: ECompetition.MEDIUM,
    overall_score: 77,
  },
  {
    id: 7,
    keyword: 'Span',
    search_volume: 43404396,
    competition: ECompetition.VERY_HIGH,
    overall_score: 63,
  },
  {
    id: 8,
    keyword: 'Solarbreeze',
    search_volume: 45647767,
    competition: ECompetition.HIGH,
    overall_score: 89,
  },
  {
    id: 9,
    keyword: 'Overhold',
    search_volume: 38863739,
    competition: ECompetition.VERY_HIGH,
    overall_score: 9,
  },
  {
    id: 10,
    keyword: 'Lotstring',
    search_volume: 22865426,
    competition: ECompetition.HIGH,
    overall_score: 47,
  },
  {
    id: 11,
    keyword: 'Alpha',
    search_volume: 62962521,
    competition: ECompetition.VERY_HIGH,
    overall_score: 28,
  },
  {
    id: 12,
    keyword: 'Vagram',
    search_volume: 77483399,
    competition: ECompetition.LOW,
    overall_score: 58,
  },
  {
    id: 13,
    keyword: 'Alphazap',
    search_volume: 36476035,
    competition: ECompetition.HIGH,
    overall_score: 27,
  },
  {
    id: 14,
    keyword: 'Daltfresh',
    search_volume: 30136705,
    competition: ECompetition.MEDIUM,
    overall_score: 10,
  },
];

describe('getSortedKeywordsByOrder', () => {
  it('should throw an error if fieldName is not provided', () => {
    expect(() => {
      getSortedKeywordsByOrder({
        keywords: keywordsMockDB,
        fieldName: undefined as unknown as EKeywordKeys,
        sortSortBy: ESortOrderBy.ASC,
      });
    }).toThrow('fieldName is required to sort');
  });

  it('should throw an error if sorting by an unexpected field', () => {
    expect(() => {
      getSortedKeywordsByOrder({
        keywords: keywordsMockDB,
        fieldName: EKeywordKeys.KEYWORD,
        sortSortBy: null as unknown as ESortOrderBy,
      });
    }).toThrow('sortSortBy is required to sort');
  });

  test('should throw an error if field is undefined', () => {
    const keywordsUndefined = [
      { ...keywordsMockDB[0], id: undefined },
      { ...keywordsMockDB[1], id: undefined },
    ] as unknown as IKeywordItem[];
    expect(() =>
      getSortedKeywordsByOrder({
        keywords: keywordsUndefined,
        fieldName: EKeywordKeys.ID,
        sortSortBy: ESortOrderBy.ASC,
      }),
    ).toThrowError('Cannot sort by undefined field');
  });

  test('should sort by ID in ascending order', () => {
    const sortedList = getSortedKeywordsByOrder({
      keywords: keywordsMockDB,
      fieldName: EKeywordKeys.ID,
      sortSortBy: ESortOrderBy.ASC,
    });
    const expectedList = [...keywordsMockDB].sort((a, b) => a.id - b.id);
    expect(sortedList).toEqual(expectedList);
  });

  test('should sort by KEYWORDS in ascending order', () => {
    const keywords = [keywordsMockDB[0], keywordsMockDB[1], keywordsMockDB[2]];
    const sortedKeywords = getSortedKeywordsByOrder({
      keywords,
      fieldName: EKeywordKeys.KEYWORD,
      sortSortBy: ESortOrderBy.ASC,
    });
    expect(sortedKeywords).toEqual(keywords);
  });

  test('should sort by search_volume in ascending order', () => {
    const keywords = [keywordsMockDB[0], keywordsMockDB[1], keywordsMockDB[2]];
    const sortedKeywords = getSortedKeywordsByOrder({
      keywords,
      fieldName: EKeywordKeys.SEARCH_VOLUME,
      sortSortBy: ESortOrderBy.ASC,
    });
    expect(sortedKeywords).toEqual([keywordsMockDB[2], keywordsMockDB[1], keywordsMockDB[0]]);
  });

  test('should sort by search_volume in descending order', () => {
    const keywords = [keywordsMockDB[0], keywordsMockDB[1], keywordsMockDB[2]];
    const sortedKeywords = getSortedKeywordsByOrder({
      keywords,
      fieldName: EKeywordKeys.SEARCH_VOLUME,
      sortSortBy: ESortOrderBy.DESC,
    });
    expect(sortedKeywords).toEqual(keywords);
  });

  test('should sort by competition in ascending order', () => {
    const keywords = [keywordsMockDB[0], keywordsMockDB[1], keywordsMockDB[2]];
    const sortedKeywords = getSortedKeywordsByOrder({
      keywords,
      fieldName: EKeywordKeys.COMPETITION,
      sortSortBy: ESortOrderBy.ASC,
    });
    expect(sortedKeywords).toEqual([keywordsMockDB[1], keywordsMockDB[2], keywordsMockDB[0]]);
  });

  test('should sort by competition in descending order', () => {
    const keywords = [keywordsMockDB[0], keywordsMockDB[1], keywordsMockDB[2]];
    const sortedKeywords = getSortedKeywordsByOrder({
      keywords,
      fieldName: EKeywordKeys.COMPETITION,
      sortSortBy: ESortOrderBy.DESC,
    });
    expect(sortedKeywords).toEqual([keywordsMockDB[0], keywordsMockDB[2], keywordsMockDB[1]]);
  });

  test('should sort by overall_score in ascending order', () => {
    const keywords = [keywordsMockDB[0], keywordsMockDB[1], keywordsMockDB[2]];
    const sortedKeywords = getSortedKeywordsByOrder({
      keywords,
      fieldName: EKeywordKeys.OVERALL_SCORE,
      sortSortBy: ESortOrderBy.ASC,
    });
    expect(sortedKeywords).toEqual(keywords);
  });

  test('should sort by overall_score in descending order', () => {
    const keywords = [keywordsMockDB[0], keywordsMockDB[1], keywordsMockDB[2]];
    const sortedKeywords = getSortedKeywordsByOrder({
      keywords,
      fieldName: EKeywordKeys.OVERALL_SCORE,
      sortSortBy: ESortOrderBy.DESC,
    });
    expect(sortedKeywords).toEqual([keywordsMockDB[2], keywordsMockDB[1], keywordsMockDB[0]]);
  });
});
