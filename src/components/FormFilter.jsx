import React from 'react';
import { TextField, Box } from '@mui/material';
import { FilterNames } from '../types/filterName.dto';

function HotelFilter({ handleFilterChange, nameFilterValue }) {
  const handleSearchChange = event => {
    handleFilterChange(FilterNames.nameFilter,event.target.value);
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Filter by Name"
        variant="outlined"
        value={nameFilterValue}
        onChange={handleSearchChange}
        sx={{ margin: '8px 0', backgroundColor: 'white' }}
      />
    </Box>
  );
}

export default HotelFilter;
