import { fireEvent, render, screen } from '@testing-library/react';
import { ECompetition } from '../../../entities/Keywords';

import { SortableTable } from '../SortableTable';

describe('SortableTable', () => {
  const mockProps = {
    bodyRows: [
      {
        id: 1,
        keyword: 'Ronstring',
        search_volume: 54305480,
        competition: ECompetition.HIGH,
        overall_score: 6,
      },
      {
        id: 2,
        keyword: 'Konklux',
        search_volume: 16547286,
        competition: ECompetition.LOW,
        overall_score: 44,
      },
      {
        id: 3,
        keyword: 'Biodex',
        search_volume: 11543253,
        competition: ECompetition.MEDIUM,
        overall_score: 69,
      },
      {
        id: 4,
        keyword: 'Temp',
        search_volume: 38419228,
        competition: ECompetition.LOW,
        overall_score: 8,
      },
    ],
    selectedColumnIndex: 1,
    trendingKeywordsIds: [1, 3],
    isMobile: false,
    onSortButtonClick: jest.fn(),
  };

  test('renders table with correct data', () => {
    render(<SortableTable {...mockProps} />);

    expect(screen.getByText('Keywords')).toBeInTheDocument();
    expect(screen.getByText('Search volume')).toBeInTheDocument();
    expect(screen.getByText('Competition')).toBeInTheDocument();
    expect(screen.getByText('Overall Score')).toBeInTheDocument();

    expect(screen.getByText('Ronstring')).toBeInTheDocument();
    expect(screen.getByText('Konklux')).toBeInTheDocument();
    expect(screen.getByText('Biodex')).toBeInTheDocument();

    expect(screen.getByText('54305480')).toBeInTheDocument();
    expect(screen.getByText('16547286')).toBeInTheDocument();
    expect(screen.getByText('11543253')).toBeInTheDocument();
    expect(screen.getByText('Temp')).toBeInTheDocument();

    expect(screen.getByText('medium')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();

    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('44')).toBeInTheDocument();
    expect(screen.getByText('69')).toBeInTheDocument();
  });

  test('calls onSortButtonClick when sort button is clicked', () => {
    render(<SortableTable {...mockProps} />);
    fireEvent.click(screen.getByText('Keywords'));

    expect(mockProps.onSortButtonClick).toHaveBeenCalledWith('keyword');
  });
});
