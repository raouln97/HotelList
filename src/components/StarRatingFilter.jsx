import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Rating, Grid } from '@mui/material';

function StarRatingFilter({checkBoxOptions, starRatingFilter, setStarRatingFilter }) {


  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let newVal

    setStarRatingFilter(prev => {
      if (checked & !starRatingFilter.includes(value)) {
         newVal = [...prev, value];
      } else {
        newVal =  prev.filter(option => option !== value);
      }
      return newVal
    });
  };

  return (
    <FormGroup>
      {checkBoxOptions.map((option, index) => (
        <Grid flexDirection='row' display='flex' alignItems='center' key={index}>
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
            <Rating name="read-only" value={option} readOnly/>
        </Grid>
      ))}
    </FormGroup>
  );
}

export default StarRatingFilter;
