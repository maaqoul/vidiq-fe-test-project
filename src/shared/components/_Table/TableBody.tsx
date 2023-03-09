import { PropsWithChildren, ReactNode } from 'react';
import { IScoreTagType } from '../../types';
import { ScoreTag } from '../ScoreTag';

type TableBodyProps = {
  rows: {
    id: number;
    cols: { key: string; value: ReactNode; scoreType?: IScoreTagType }[];
  }[];
};

function TableBody({ rows }: PropsWithChildren<TableBodyProps>) {
  return (
    <tbody className='table-body'>
      {rows.map((row) => (
        <tr key={row.id} className='table-body-row'>
          {row.cols.map((col) => (
            <td key={col.key} className='table-body-col'>
              {col.scoreType && typeof col.value === 'number' ? (
                <ScoreTag score={col.value} type={col.scoreType} />
              ) : (
                col.value
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
