import { useEffect, useState } from 'react';
import { EKeywordKeys, ESortOrderBy, IKeywordItem } from '../../../../../entities/Keywords';
import { getSortedKeywordsByOrder } from '../helpers';

export const useSortKeywords = (
  keywords: IKeywordItem[],
  sortSortBy: ESortOrderBy,
  fieldName: EKeywordKeys,
) => {
  const [sortedKeywords, setSortedKeywords] = useState<IKeywordItem[]>(keywords);

  useEffect(() => {
    const doSortKeywords = () => {
      if (!keywords.length) return;
      setSortedKeywords(getSortedKeywordsByOrder({ keywords, sortSortBy, fieldName }));
    };
    doSortKeywords();
  }, [keywords, sortSortBy, fieldName]);
  return sortedKeywords;
};
