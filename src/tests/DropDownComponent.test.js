import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DropDownComponent from '../components/DropDownComponent';

describe('DropDownComponent', () => {
  const mockHandleEventChange = jest.fn();
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const label = 'Test Label';

  test('renders with correct label', () => {
    render(
        <DropDownComponent
          optionValue={options[0]}
          handleEventChange={mockHandleEventChange}
          options={options}
          label={label}
        />
      );
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  test('selects the correct initial value', async () => {
    render(
        <DropDownComponent
          optionValue={options[0]}
          handleEventChange={mockHandleEventChange}
          options={options}
          label={label}
        />
      );
      userEvent.click(screen.getByLabelText(label));
      const dropDownBox = screen.getByRole('combobox', { name: label });
      expect(dropDownBox).toHaveTextContent(options[0]);
  });

  test('calls handleEventChange on option select', async () => {
    render(
      <DropDownComponent
        optionValue={options[0]}
        handleEventChange={mockHandleEventChange}
        options={options}
        label={label}
      />
    );
  
    const selectElement = screen.getByLabelText(label);
    await userEvent.click(selectElement);
  
    const optionToSelect = await screen.findByText(options[1]);
    await userEvent.click(optionToSelect);
  
    expect(mockHandleEventChange).toHaveBeenCalledWith(options[1]);
  });
});
