import { EColumnIndexKey, EKeywordKeys, IColumnConfig, IKeywordByKeyMap } from '../model/types';

const KEYWORDS_COLUMNS: IColumnConfig[] = [
  { title: 'Keywords', key: EKeywordKeys.KEYWORD },
  { title: 'Search volume', key: EKeywordKeys.SEARCH_VOLUME },
  { title: 'Competition', key: EKeywordKeys.COMPETITION },
  { title: 'Overall Score', key: EKeywordKeys.OVERALL_SCORE },
];
const DEFAULT_ROWS_LIMIT = 24;
const MOBILE_TABLE_SELECT_OPTIONS = KEYWORDS_COLUMNS.slice(EColumnIndexKey.SEARCH_VOLUME);
const DEFAULT_PAGINATION_PAGE = 1;

const KEYWORD_INDEX_BY_KEY = KEYWORDS_COLUMNS.reduce<IKeywordByKeyMap>(
  (acc, keyword: IColumnConfig, index) => {
    if (!acc[keyword.key]) acc[keyword.key] = index;
    return acc;
  },
  {} as IKeywordByKeyMap,
);
const DEFAULT_OPTION = KEYWORDS_COLUMNS[EColumnIndexKey.SEARCH_VOLUME];
// Local Storage keys
const MOBILE_TABLE_SELECTED_COLUMN_LOCAL_STORAGE_KEY = 'MOBILE_TABLE_SELECTED_COLUMN';
const SELECTED_PAGINATION_PAGE_LOCAL_STORAGE_KEY = 'SELECTED_PAGINATION_PAGE';
const SORT_ORDER_BY_LOCAL_STORAGE_KEY = 'SORT_ORDER_BY';
const SORT_ORDER_FIELD_NAME_LOCAL_STORAGE_KEY = 'SORT_ORDER_FIELD_NAME';

export {
  DEFAULT_OPTION,
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_ROWS_LIMIT,
  KEYWORD_INDEX_BY_KEY,
  KEYWORDS_COLUMNS,
  MOBILE_TABLE_SELECT_OPTIONS,
  MOBILE_TABLE_SELECTED_COLUMN_LOCAL_STORAGE_KEY,
  SELECTED_PAGINATION_PAGE_LOCAL_STORAGE_KEY,
  SORT_ORDER_BY_LOCAL_STORAGE_KEY,
  SORT_ORDER_FIELD_NAME_LOCAL_STORAGE_KEY,
};
