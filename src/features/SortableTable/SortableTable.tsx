import './SortableTable.scss';

import { memo, PropsWithChildren, ReactElement, useCallback } from 'react';
import { KEYWORDS_COLUMNS } from '../../entities/Keywords/const';
import { IColumnConfig, IKeyItem } from '../../entities/Keywords/model/types';
import ScoreTag from '../../shared/components/ScoreTag/ScoreTag';
import { SortButton } from '../../shared/components/SortButton';
import { getScoreTypeByCompetition } from './helpers';

type ITableProps = {
  bodyRows: IKeyItem[];
  isMobile: boolean;
};

export const SortableTable = memo(({ bodyRows, isMobile }: PropsWithChildren<ITableProps>) => {
  const onTableHeadItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: IColumnConfig['key'],
  ) => {
    console.log(key);
  };

  // TODO: FIX ME -> Move this logic into Redux store.
  const getMobileBodyCol = useCallback((col: IKeyItem) => {
    return (
      <td className='table-body-col'>
        <div className='table-text' title={`${col.search_volume}`}>
          {col.search_volume}
        </div>
      </td>
    );
  }, []);

  return (
    <div className='table-container'>
      <table className='table'>
        <thead className='table-head'>
          <tr className='table-head-row'>
            {
              // TODO: FIX ME!!! Move this logic into Redux store.
            }
            {KEYWORDS_COLUMNS.reduce<ReactElement[]>((acc, col) => {
              if (isMobile && col.key !== 'keyword' && col.key !== 'search_volume') {
                return acc;
              }
              return acc.concat(
                <th className='table-head-col' key={col.title}>
                  <SortButton title={col.title} onClick={(e) => onTableHeadItemClick(e, col.key)} />
                </th>,
              );
            }, [])}
          </tr>
        </thead>
        <tbody className='table-body'>
          {bodyRows.map((col) => {
            return (
              <tr key={col.id} className='table-body-row'>
                <td className='table-body-col'>
                  <div className='table-text' title={col.keyword}>
                    {col.id} - {col.keyword}
                  </div>
                </td>
                {isMobile ? (
                  getMobileBodyCol(col)
                ) : (
                  <>
                    <td className='table-body-col'>
                      <div className='table-text' title={`${col.search_volume}`}>
                        {col.search_volume}
                      </div>
                    </td>
                    <td className='table-body-col'>{col.competition}</td>
                    <td className='table-body-col'>
                      <ScoreTag
                        score={col.overall_score}
                        type={getScoreTypeByCompetition(col.competition)}
                      />
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
        {
          // TODO: Implement tfoot
          // footerRows != null ? <tfoot>{footerRows.map(f => </>{f}</>)}</tfoot> : footerRows
        }
      </table>
    </div>
  );
});
