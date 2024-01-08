import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FilterAndSorts from '../components/FiltersAndSort';

describe('FilterAndSorts', () => {
  const handleFilterChange = jest.fn();
  const mockResetFilters = jest.fn();

  const filters = {
    nameFilter: '',
    starRatingFilter: [],
    priceFilter: [],
    priceFilterLimit: [100, 500],
    reviewRatingFilter: 'Any',
    sortOrder: ''
  }

  const props = {
    filterValues: filters,
    handleFilterChange: handleFilterChange,
    resetFilters: mockResetFilters,
  };

  test('renders the component', () => {
    render(<FilterAndSorts {...props} />);
    const sortByDropdowns = screen.getAllByRole('combobox', {
      id: 'drop-down-label',
    });
    expect(sortByDropdowns.length).toBe(2);
    expect(screen.getByText('Filter By Star Rating:')).toBeInTheDocument();
    expect(screen.getByText('Filter By Hotel Pricing:')).toBeInTheDocument();
  });

  test('calls onSortChange when sort option is changed', async () => {
    render(<FilterAndSorts {...props} />);
    const dropdowns = screen.getAllByRole('combobox', { name: /Sort By/i });
    await userEvent.click(dropdowns[0]);

    const option = await screen.findByRole('option', {
      name: 'Price (lowest first)',
    });
    await userEvent.click(option);

    expect(handleFilterChange).toHaveBeenCalledWith("sortOrder", "Price (lowest first)");
  });

  test('calls onRatingChange when guest rating option is changed', async () => {
    render(<FilterAndSorts {...props} />);
    const dropdowns = screen.getAllByRole('combobox', { name: /Sort By/i });
    await userEvent.click(dropdowns[1]);
    const option = await screen.findByRole('option', { name: '9+' });
    await userEvent.click(option);
    expect(handleFilterChange).toHaveBeenCalledWith( "reviewRatingFilter", "9+");
  });

  test('calls onNameChange when name filter value is changed', () => {
    render(<FilterAndSorts {...props} />);
    fireEvent.change(screen.getByLabelText('Filter by Name'), {
      target: { value: 'Test Name' },
    });
    expect(handleFilterChange).toHaveBeenCalledWith("nameFilter", "Test Name");
  });
});
