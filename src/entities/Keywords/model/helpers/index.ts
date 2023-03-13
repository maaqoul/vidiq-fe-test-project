import { DEFAULT_MOBILE_TABLE_DROPDOWN_OPTION, KEYWORDS_COLUMNS_CONFIG } from '../../const';
import {
  EColumnIndexKey,
  ECompetition,
  EKeywordKeys,
  ESortOrderBy,
  IColumnConfig,
  type IKeywordItem,
} from '../types';

export function getSortedKeywordsByOrder({
  keywords = [],
  fieldName,
  sortSortBy,
}: {
  keywords: IKeywordItem[];
  fieldName: EKeywordKeys;
  sortSortBy: ESortOrderBy;
}): IKeywordItem[] {
  if (!fieldName) {
    throw new Error('fieldName is required to sort');
  }
  if ((sortSortBy !== ESortOrderBy.ASC && sortSortBy !== ESortOrderBy.DESC) || !sortSortBy) {
    throw new Error('sortSortBy is required to sort');
  }

  return keywords.slice().sort((a: IKeywordItem, b: IKeywordItem) => {
    if (typeof a[fieldName] === 'undefined' || typeof b[fieldName] === 'undefined') {
      throw new Error('Cannot sort by undefined field');
    }
    let sortA = a;
    let sortB = b;
    if (sortSortBy === ESortOrderBy.DESC) {
      sortA = b;
      sortB = a;
    }
    switch (fieldName) {
      case EKeywordKeys.KEYWORD:
      case EKeywordKeys.ID: {
        // TODO: I need to know if sorting by words is required. I assume we should limit it to sorting by 'id'.
        // Note: I perere a logic with sorting by 'id', but here's the logic for KEYWORDS:
        // return sortA[field].localeCompare(sortB[field]);
        return sortA.id - sortB.id;
      }
      case EKeywordKeys.COMPETITION: {
        const competitionOrder = [
          ECompetition.VERY_LOW,
          ECompetition.LOW,
          ECompetition.MEDIUM,
          ECompetition.HIGH,
          ECompetition.VERY_HIGH,
        ];
        return (
          competitionOrder.indexOf(sortA[fieldName]) - competitionOrder.indexOf(sortB[fieldName])
        );
      }
      case EKeywordKeys.OVERALL_SCORE:
      case EKeywordKeys.SEARCH_VOLUME: {
        if (sortA[fieldName] === sortB[fieldName]) return 0;
        return sortA[fieldName] - sortB[fieldName];
      }
      default: {
        throw new Error('Cannot sort by unexpected field');
      }
    }
  });
}

export const getDefaultOptionBySelectedColumnIndex = (
  selectedColumnIndex: EColumnIndexKey,
): IColumnConfig =>
  selectedColumnIndex != null &&
  selectedColumnIndex !== EColumnIndexKey.KEYWORD &&
  selectedColumnIndex <= KEYWORDS_COLUMNS_CONFIG.length
    ? KEYWORDS_COLUMNS_CONFIG[selectedColumnIndex]
    : DEFAULT_MOBILE_TABLE_DROPDOWN_OPTION;
