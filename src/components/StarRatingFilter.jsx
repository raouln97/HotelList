import React from 'react';
import { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Rating,
  Grid,
} from '@mui/material';
import { FilterNames } from '../types/filterName.dto';

function StarRatingFilter({
  checkBoxOptions,
  starRatingFilter,
  handleFilterChange,
}) {
  const handleCheckboxChange = event => {
    const { value, checked } = event.target;
    let newVal =[]
      if (checked && !starRatingFilter.includes(value)) {
        newVal.push(...starRatingFilter, value)
      } else {
        newVal = starRatingFilter.filter(option => option !== value);
      }
    handleFilterChange(FilterNames.starRatingFilter, newVal)
  };

  return (
    <FormGroup>
      {checkBoxOptions.map((option, index) => (
        <Grid
          flexDirection="row"
          display="flex"
          alignItems="center"
          key={index}
        >
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                data-testid={'star_rating'}
                checked={starRatingFilter.includes(`${option}`)}
                onChange={handleCheckboxChange}
                value={option}
              />
            }
          />
          <Rating name="read-only" value={option} readOnly />
        </Grid>
      ))}
    </FormGroup>
  );
}

export default StarRatingFilter;
