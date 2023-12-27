import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FilterAndSorts from '../components/FiltersAndSort';

describe('FilterAndSorts', () => {
  const mockOnNameChange = jest.fn();
  const mockSetStarRatingFilter = jest.fn();
  const mockOnPriceFilterChange = jest.fn();
  const mockOnSortChange = jest.fn();
  const mockOnRatingChange = jest.fn();
  const mockResetFilters = jest.fn();

  const props = {
    onNameChange: mockOnNameChange,
    nameFilterValue: '',
    starRatingFilter: [],
    setStarRatingFilter: mockSetStarRatingFilter,
    onPriceFilterChange: mockOnPriceFilterChange,
    pricingOptions: [100, 500],
    onSortChange: mockOnSortChange,
    sortOption: '',
    onRatingChange: mockOnRatingChange,
    guestRatingValue: '',
    resetFilters: mockResetFilters,
  };

  test('renders the component', () => {
    render(<FilterAndSorts {...props} />);
    const sortByDropdowns = screen.getAllByRole('combobox', { id: 'drop-down-label' });
    expect(sortByDropdowns.length).toBe(2);
    expect(screen.getByText('Filter By Star Rating:')).toBeInTheDocument();
    expect(screen.getByText('Filter By Hotel Pricing:')).toBeInTheDocument();
  });  

  test('calls onSortChange when sort option is changed', async () => {
    render(<FilterAndSorts {...props} />);
    const dropdowns = screen.getAllByRole('combobox', { name: /Sort By/i });
    await userEvent.click(dropdowns[0]);
  
    const option = await screen.findByRole('option', { name: 'Price (lowest first)' });
    await userEvent.click(option);
  
    expect(mockOnSortChange).toHaveBeenCalledWith('Price (lowest first)');
  });

  test('calls onRatingChange when guest rating option is changed', async () => {
    render(<FilterAndSorts {...props} />);
    const dropdowns = screen.getAllByRole('combobox', { name: /Sort By/i });
    await userEvent.click(dropdowns[1]);
    const option = await screen.findByRole('option', { name: '9+'});
    await userEvent.click(option);
    expect(mockOnRatingChange).toHaveBeenCalledWith('9+');
  });

  test('calls onNameChange when name filter value is changed', () => {
    render(<FilterAndSorts {...props} />);
    fireEvent.change(screen.getByLabelText("Filter by Name"), { target: { value: 'Test Name' } });
    expect(mockOnNameChange).toHaveBeenCalledWith('Test Name');
  });

//   test('calls SetStarRatingFilter when new checkbox selected', () => {
//     render(<FilterAndSorts {...props} />);
//     const starRatingCheckboxes = screen.getAllByTestId('star_rating');
//     fireEvent.click(starRatingCheckboxes[2]);
//     expect(mockSetStarRatingFilter).toHaveBeenCalledWith(expect.arrayContaining([3]));
//   });

});
