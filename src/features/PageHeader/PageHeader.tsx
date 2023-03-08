import './PageHeader.scss';

import { FC, memo } from 'react';
import {
  DEFAULT_MOBILE_TABLE_SELECT_OPTION_INDEX,
  DEFAULT_OPTION,
  MOBILE_TABLE_SELECTED_COLUMN_LOCAL_STORAGE_KEY,
  MOBILE_TABLE_SELECT_OPTIONS,
} from '../../entities/Keywords';
import { Dropdown } from '../../shared/components/Dropdown';
import { useLocalStorage } from '../../shared/hooks';

type PageHeaderProps = {
  isMobile: boolean;
};

export const PageHeader: FC<PageHeaderProps> = memo(({ isMobile }) => {
  const [storedValue, setValue] = useLocalStorage(
    MOBILE_TABLE_SELECTED_COLUMN_LOCAL_STORAGE_KEY,
    DEFAULT_MOBILE_TABLE_SELECT_OPTION_INDEX,
  );
  // NOTE: I don't like it at all, but it meets business requirements.
  // So, the variable MOBILE_TABLE_SELECT_OPTIONS does not include first item,
  // because on all devices we have the first column
  const defaultOptions =
    storedValue != null ? MOBILE_TABLE_SELECT_OPTIONS[storedValue] : DEFAULT_OPTION;

  return (
    <header>
      <div className='header'>
        <h1 className='header-title'>List of keywords</h1>
        {isMobile && (
          <Dropdown
            onChange={(option) => {
              // TODO: FIX ME This logic should be Maped by object or Redux selector
              setValue(MOBILE_TABLE_SELECT_OPTIONS.findIndex((col) => col.key === option.key));
            }}
            options={MOBILE_TABLE_SELECT_OPTIONS}
            defaultOption={defaultOptions}
          />
        )}
      </div>
    </header>
  );
});
