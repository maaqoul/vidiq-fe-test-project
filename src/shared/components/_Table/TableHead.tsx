import { MouseEvent, PropsWithChildren } from 'react';
import { SortButton } from '../SortButton';

type TableHeadProps<T> = {
  rows: {
    id: number;
    cols: { key: T; title: string }[];
  }[];
  onTableHeadItemClick: (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, key: T) => void;
};

function TableHead<T>({ rows, onTableHeadItemClick }: PropsWithChildren<TableHeadProps<T>>) {
  return (
    <thead className='table-head'>
      {rows.map((row) => (
        <tr className='table-head-row' key={row.id}>
          {row.cols.map((col) => (
            <th className='table-head-col' key={col.title}>
              <SortButton title={col.title} onClick={(e) => onTableHeadItemClick(e, col.key)} />
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

export default TableHead;
