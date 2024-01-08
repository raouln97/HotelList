import React, { useEffect, useState } from 'react';
import { Box, Slider, TextField, InputAdornment } from '@mui/material';
import { FilterNames } from '../types/filterName.dto';

const RangeSlider = ({ handleFilterChange, options, priceFilterLimit }) => {
  const [value, setValue] = useState(options);

  useEffect(() => {
    setValue(options);
  }, [options]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleFilterChange(FilterNames.priceFilter,newValue);
  };

  const handleMinChange = event => {
    const inputValue = event.target.value;
    setValue([inputValue, value[1]]);
  };
  
  const handleMinBlur = () => {
    let minVal = Number(value[0]);
    if (isNaN(minVal) || minVal < priceFilterLimit[0]) {
      minVal = priceFilterLimit[0];
    }
    const newValue = [minVal, value[1]];
    setValue(newValue);
    handleFilterChange(FilterNames.priceFilter, newValue);
  };
  

  const handleMaxChange = event => {
    const minVal = value[0];
    const maxVal = Math.min(Number(event.target.value), priceFilterLimit[1]);
    const newValue = [minVal, maxVal];
    setValue(newValue);
    handleFilterChange(FilterNames.priceFilter, newValue);
  };

  return (
    <Box>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={priceFilterLimit[0]}
        max={priceFilterLimit[1]}
        sx={{
          marginTop: 2,
          color: 'purple',
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          label="MIN"
          value={value[0]}
          onChange={handleMinChange}
          onBlur={handleMinBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">SGD</InputAdornment>
            ),
          }}
          sx={{ width: '100px' }}
        />
        <TextField
          label="MAX"
          value={value[1]}
          onChange={handleMaxChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">SGD</InputAdornment>
            ),
          }}
          sx={{ width: '100px' }}
        />
      </Box>
    </Box>
  );
};

export default RangeSlider;
