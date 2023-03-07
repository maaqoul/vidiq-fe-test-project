import './PageHeader.scss';

import { FC } from 'react';
import { KEYWORDS_COLUMNS } from '../../entities/Keywords/const';
import { Dropdown } from '../../shared/components/Dropdown';

type PageHeaderProps = {
  isMobile: boolean;
};

export const PageHeader: FC<PageHeaderProps> = ({ isMobile }) => {
  return (
    <header>
      <div className='header'>
        <h1 className='header-title'>List of keywords</h1>
        {isMobile && (
          <Dropdown
            onChange={() => {}}
            options={KEYWORDS_COLUMNS}
            defaultOption={{ title: 'Search Volume', key: 'search_volume' }}
          />
        )}
      </div>
    </header>
  );
};
