import './SortableTable.scss';

import { PropsWithChildren } from 'react';
import { KEYWORDS_COLUMNS } from '../../entities/Keywords/const';
import { ECompetition, IColumnConfig, IKeyItem } from '../../entities/Keywords/model/types';
import { Score } from '../../shared/components/Score';
import { SortButton } from '../../shared/components/SortButton';

type ITableProps = {
  bodyRows: IKeyItem[];
};

export const getScoreTypeByCompetition = (competition: ECompetition) => {
  switch (competition) {
    case ECompetition.LOW:
      return 'orange';
    case ECompetition.MEDIUM:
      return 'yellow';
    case ECompetition.HIGH:
      return 'light green';
    case ECompetition.VERY_HIGH:
      return 'green';
    case ECompetition.VERY_LOW:
    default: {
      return 'red';
    }
  }
};

export const SortableTable = ({ bodyRows }: PropsWithChildren<ITableProps>) => {
  const onTableHeadItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: IColumnConfig['key'],
  ) => {
    console.log(key);
  };

  return (
    <div className='table-container'>
      <table className='table'>
        <thead className='table-head'>
          <tr className='table-head-row'>
            {KEYWORDS_COLUMNS.map((col) => (
              <th className='table-head-col' key={col.title}>
                <SortButton title={col.title} onClick={(e) => onTableHeadItemClick(e, col.key)} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='table-body'>
          {bodyRows.map((col) => (
            <tr key={col.id} className='table-body-row'>
              <td className='table-body-col'>
                <div className='table-text' title={col.keyword}>
                  {col.keyword}
                </div>
              </td>
              <td className='table-body-col'>
                <div className='table-text' title={`${col.search_volume}`}>
                  {col.search_volume}
                </div>
              </td>
              <td className='table-body-col'>{col.competition}</td>
              <td className='table-body-col'>
                <Score
                  score={col.overall_score}
                  type={getScoreTypeByCompetition(col.competition)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        {
          // TODO: Implement tfoot
          // tFooterData != null ? <tfoot>{tFooterData}</tfoot> : tFooterData
        }
      </table>
    </div>
  );
};
