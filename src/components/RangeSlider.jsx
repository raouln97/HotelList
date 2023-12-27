import React, {useEffect, useState} from 'react';
import { Box, Slider, TextField, InputAdornment } from '@mui/material';

const RangeSlider = ({onPriceFilterChange, options}) => {
  const [value, setValue] = useState(options);

  useEffect(()=>{
    setValue(options);
  }, [options])

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onPriceFilterChange(newValue);
  };

  const handleMinChange = (event) => {
    const newValue = [Math.min(event.target.value, value[1]), value[1]]
    setValue(newValue)
  };

  const handleMaxChange = (event) => {
    const newValue = [value[0], Math.max(event.target.value, value[0])]
    setValue(newValue)
  };

  return (
    <Box>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={options[1]}
        sx={{ 
          marginTop: 2, 
          color: 'purple'
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          label="MIN"
          value={value[0]}
          onChange={handleMinChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">SGD</InputAdornment>,
          }}
          sx={{ width: '100px' }}
        />
        <TextField
          label="MAX"
          value={value[1]}
          onChange={handleMaxChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">SGD</InputAdornment>,
          }}
          sx={{ width: '100px' }}
        />
      </Box>
    </Box>
  );
};

export default RangeSlider;
