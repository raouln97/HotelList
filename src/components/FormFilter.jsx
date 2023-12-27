import React from 'react';
import { TextField, Box } from '@mui/material';

function HotelFilter({onNameChange, nameFilterValue}) {

  const handleSearchChange = (event) => {
      onNameChange(event.target.value)
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Filter by Name"
        variant="outlined"
        value={nameFilterValue}
        onChange={handleSearchChange}
        sx={{ margin: '8px 0', backgroundColor: 'white'}} 
      />
    </Box>
  );
}

export default HotelFilter;
