import './SortableTable.scss';

import { memo, useCallback, type PropsWithChildren, type ReactElement } from 'react';
import {
  EColumnIndexKey,
  EKeywordKeys,
  KEYWORDS_COLUMNS_CONFIG,
  type IKeywordItem,
} from '../../entities/Keywords';
import { type ITrendingKeywordsIdsMap } from '../../entities/TrendingKeywords';
import { ScoreTag } from '../../shared/components/ScoreTag';
import { SortButton } from '../../shared/components/SortButton';
import { getScoreTypeByCompetition } from './helpers';

type ITableProps = {
  // TODO: perhaps we should move this property to a component.
  bodyRows: IKeywordItem[];
  selectedColumnIndex: EColumnIndexKey;
  trendingKeywordsById: ITrendingKeywordsIdsMap;
  isMobile: boolean;
  onSortButtonClick: (fieldName: EKeywordKeys) => void;
};

export const SortableTable = memo(
  ({
    bodyRows,
    isMobile,
    selectedColumnIndex,
    trendingKeywordsById,
    onSortButtonClick,
  }: PropsWithChildren<ITableProps>) => {
    const getHeadColumns = useCallback(() => {
      return KEYWORDS_COLUMNS_CONFIG.reduce<ReactElement[]>((acc, col) => {
        if (
          isMobile &&
          col.key !== EKeywordKeys.KEYWORD &&
          KEYWORDS_COLUMNS_CONFIG[selectedColumnIndex].key !== col.key
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
            {bodyRows.map((col) => (
              <tr key={col.id} className='table-body-row'>
                <td className='table-body-col'>
                  <div className='table-text' title={col.keyword}>
                    {col.keyword}
                    {trendingKeywordsById[col.id] && (
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
