import './PageHeader.scss';

import { FC, memo } from 'react';
import {
  DEFAULT_OPTION,
  KEYWORDS_COLUMNS,
  KEYWORD_INDEX_BY_KEY,
  MOBILE_TABLE_SELECT_OPTIONS,
} from '../../entities/Keywords';
import { Dropdown } from '../../shared/components/Dropdown';

type PageHeaderProps = {
  isMobile: boolean;
  storedSelectedColumnIndex: number;
  onSelectedColumnIndexChange: (newStoredSelectedColumnIndex: number) => void;
};

export const PageHeader: FC<PageHeaderProps> = memo(
  ({ isMobile, storedSelectedColumnIndex, onSelectedColumnIndexChange }) => {
    // NOTE: I don't like it at all, but it meets business requirements.
    // So, the variable MOBILE_TABLE_SELECT_OPTIONS does not include first item,
    // because on all devices we have the first column
    const defaultOptions =
      storedSelectedColumnIndex != null
        ? KEYWORDS_COLUMNS[storedSelectedColumnIndex]
        : DEFAULT_OPTION;

    return (
      <header>
        <div className='header'>
          <h1 className='header-title'>List of keywords</h1>
          {isMobile && (
            <Dropdown
              onChange={(option) => {
                const newStoredSelectedColumnIndex = KEYWORD_INDEX_BY_KEY[option.key];
                if (newStoredSelectedColumnIndex !== storedSelectedColumnIndex)
                  onSelectedColumnIndexChange(newStoredSelectedColumnIndex);
              }}
              options={MOBILE_TABLE_SELECT_OPTIONS}
              defaultOption={defaultOptions}
            />
          )}
        </div>
      </header>
    );
  },
);
