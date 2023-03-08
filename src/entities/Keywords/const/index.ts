import { EColumnKey, IColumnConfig, KeywordByKeyMap } from '../model/types';

const KEYWORDS_COLUMNS: IColumnConfig[] = [
  { title: 'Keywords', key: 'keyword' },
  { title: 'Search volume', key: 'search_volume' },
  { title: 'Competition', key: 'competition' },
  { title: 'Overall Score', key: 'overall_score' },
];
const DEFAULT_ROWS_LIMIT = 24;
const DEFAULT_MOBILE_TABLE_SELECT_OPTION_INDEX = 0; // start head col index on mobile devices
const FILTRED_OPTION_INDEX = 1;
const MOBILE_TABLE_SELECT_OPTIONS = KEYWORDS_COLUMNS.slice(FILTRED_OPTION_INDEX);
const DEFAULT_PAGINATION_PAGE = 1;

const KEYWORD_INDEX_BY_KEY = KEYWORDS_COLUMNS.reduce<KeywordByKeyMap>(
  (acc, keyword: IColumnConfig, index) => {
    if (!acc[keyword.key]) acc[keyword.key] = index;
    return acc;
  },
  {} as KeywordByKeyMap,
);
const DEFAULT_OPTION = KEYWORDS_COLUMNS[EColumnKey.SEARCH_VOLUME];
// Local Storage keys
const MOBILE_TABLE_SELECTED_COLUMN_LOCAL_STORAGE_KEY = 'MOBILE_TABLE_SELECTED_COLUMN';
const SELECTED_PAGINATION_PAGE_LOCAL_STORAGE_KEY = 'SELECTED_PAGINATION_PAGE';

export {
  DEFAULT_MOBILE_TABLE_SELECT_OPTION_INDEX,
  DEFAULT_OPTION,
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_ROWS_LIMIT,
  FILTRED_OPTION_INDEX,
  KEYWORD_INDEX_BY_KEY,
  KEYWORDS_COLUMNS,
  MOBILE_TABLE_SELECT_OPTIONS,
  MOBILE_TABLE_SELECTED_COLUMN_LOCAL_STORAGE_KEY,
  SELECTED_PAGINATION_PAGE_LOCAL_STORAGE_KEY,
};
