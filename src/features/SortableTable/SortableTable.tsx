import './SortableTable.scss';

import { memo, PropsWithChildren, ReactElement, useCallback, useMemo } from 'react';
import {
  EColumnIndexKey,
  EKeywordKeys,
  IKeywordItem,
  KEYWORDS_COLUMNS,
} from '../../entities/Keywords';
import { ITrendingKeywordsIds } from '../../entities/TrendingKeywords';
import { ScoreTag } from '../../shared/components/ScoreTag';
import { SortButton } from '../../shared/components/SortButton';
import { getScoreTypeByCompetition } from './helpers';

type ITableProps = {
  bodyRows: IKeywordItem[];
  selectedColumnIndex: EColumnIndexKey;
  trendingKeywordsIds: ITrendingKeywordsIds;
  isMobile: boolean;
  onSortButtonClick: (fieldName: EKeywordKeys) => void;
};

export const SortableTable = memo(
  ({
    bodyRows,
    isMobile,
    selectedColumnIndex,
    trendingKeywordsIds,
    onSortButtonClick,
  }: PropsWithChildren<ITableProps>) => {
    const trendingKeywordsIdsMap = useMemo(() => {
      return trendingKeywordsIds.reduce<{ [key: number]: boolean }>((acc, trendingId) => {
        if (!acc[trendingId]) acc[trendingId] = true;
        return acc;
      }, {});
    }, [trendingKeywordsIds]);

    const getHeadColumns = useCallback(() => {
      return KEYWORDS_COLUMNS.reduce<ReactElement[]>((acc, col) => {
        if (
          isMobile &&
          col.key !== EKeywordKeys.KEYWORD &&
          KEYWORDS_COLUMNS[selectedColumnIndex].key !== col.key
        ) {
          return acc;
        }
        return acc.concat(
          <th className='table-head-col' key={col.title}>
            <SortButton
              title={col.title}
              onClick={(_event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                onSortButtonClick(col.key)
              }
            />
          </th>,
        );
      }, []);
    }, [isMobile, selectedColumnIndex, onSortButtonClick]);

    const getMobileBodyCol: (col: IKeywordItem) => JSX.Element | null = useCallback(
      (col: IKeywordItem) => {
        switch (selectedColumnIndex) {
          case EColumnIndexKey.SEARCH_VOLUME: {
            return (
              <td className='table-body-col'>
                <div className='table-text' title={`${col.search_volume}`}>
                  {col.search_volume}
                </div>
              </td>
            );
          }
          case EColumnIndexKey.COMPETITION: {
            return <td className='table-body-col text-capitalize'>{col.competition}</td>;
          }
          case EColumnIndexKey.OVERALL_SCORE: {
            return (
              <td className='table-body-col'>
                <ScoreTag
                  score={col.overall_score}
                  type={getScoreTypeByCompetition(col.competition)}
                />
              </td>
            );
          }
          default: {
            return null;
          }
        }
      },
      [selectedColumnIndex],
    );

    return (
      <div className='table-container'>
        <table className='table'>
          <thead className='table-head'>
            <tr className='table-head-row'>{getHeadColumns()}</tr>
          </thead>
          <tbody className='table-body'>
            {
              // TODO: After MVP Refactor this part with using data from Store...
            }
            {bodyRows.map((col) => (
              <tr key={col.id} className='table-body-row'>
                <td className='table-body-col'>
                  <div className='table-text' title={col.keyword}>
                    {col.keyword}
                    {trendingKeywordsIdsMap[col.id] && (
                      <span className='table-text-icon'>&#128293;</span>
                    )}
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
                    <td className='table-body-col text-capitalize'>{col.competition}</td>
                    <td className='table-body-col'>
                      <ScoreTag
                        score={col.overall_score}
                        type={getScoreTypeByCompetition(col.competition)}
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
          {
            // TODO: Implement tfoot
            // footerRows != null ? <tfoot>{footerRows.map(f => </>{f}</>)}</tfoot> : footerRows
          }
        </table>
      </div>
    );
  },
);
