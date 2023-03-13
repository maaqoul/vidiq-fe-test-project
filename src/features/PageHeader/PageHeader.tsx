import './PageHeader.scss';

import { memo, type FC } from 'react';
import {
  EColumnIndexKey,
  IColumnConfig,
  MOBILE_TABLE_DROPDOWN_OPTIONS,
} from '../../entities/Keywords';
import { getDefaultOptionBySelectedColumnIndex } from '../../entities/Keywords/model/helpers';
import { Dropdown } from '../../shared/components/Dropdown';

type PageHeaderProps = {
  isMobile: boolean;
  selectedColumnIndex: EColumnIndexKey;
  onSelectedColumnIndexChange: (option: IColumnConfig) => void;
};

export const PageHeader: FC<PageHeaderProps> = memo(
  ({ isMobile, selectedColumnIndex, onSelectedColumnIndexChange }) => {
    return (
      <header>
        <div className='header'>
          <h1 className='header-title'>List of keywords</h1>
          {isMobile && (
            <Dropdown
              onChange={onSelectedColumnIndexChange}
              options={MOBILE_TABLE_DROPDOWN_OPTIONS}
              defaultOption={getDefaultOptionBySelectedColumnIndex(selectedColumnIndex)}
            />
          )}
        </div>
      </header>
    );
  },
);
