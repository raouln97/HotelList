import {
  Card,
  CardContent,
  Rating,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
import RangeSlider from './RangeSlider';
import HotelFilter from './FormFilter';
import DropDownComponent from './DropDownComponent';
import StarRatingFilter from './StarRatingFilter';
import { FilterNames } from '../types/filterName.dto';

const FilterAndSorts = ({
  filterValues,
  handleFilterChange,
  resetFilters,
}) => {
  const sortByOptions = [
    'Price (lowest first)',
    'Price (highest first)',
    'Property rating (high to low)',
    'Property rating (low to high)',
  ];
  const userRatingOptions = ['9+', '8+', '7+', '6+', 'Any'];

  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: 2,
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
      }}
    >
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Grid borderBottom="2px solid lightgrey" padding="15px">
          <DropDownComponent
            options={sortByOptions}
            handleEventChange={handleFilterChange}
            optionValue={filterValues[`${FilterNames.sortOrder}`]}
            label={'Sort By'}
            filterName={FilterNames.sortOrder}
          />
        </Grid>
        <Grid borderBottom="2px solid lightgrey" padding="15px">
          <Box border=" 1px solid lightgrey" padding="10px">
            <Grid item container>
              <Grid item xs={6} justifyContent="flex-start" display="flex">
                <Typography component="div" variant="subtitle1">
                  My Filters:
                </Typography>
              </Grid>
              <Grid item xs={6} justifyContent="flex-end" display="flex">
                <Button onClick={resetFilters} color="secondary">
                  Clear
                </Button>
              </Grid>
            </Grid>
            <Grid display="flex" flexDirection="column">
              {filterValues[`${FilterNames.starRatingFilter}`].length > 0 &&
                filterValues[`${FilterNames.starRatingFilter}`].map((rating) => {
                  return <Rating name="read-only" key={rating} value={rating} readOnly />;
                })}
              {filterValues[`${FilterNames.nameFilter}`] && (
                <Grid
                  container
                  direction="row"
                  display="flex"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <Typography component="div" variant="body1">
                      Name Filter:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="div" variant="subtitle1">
                      {filterValues[`${FilterNames.nameFilter}`]}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {filterValues[`${FilterNames.priceFilter}`].length > 0 &&
                filterValues[`${FilterNames.priceFilter}`].map((option, index) => {
                  return (
                    <Grid
                      container
                      direction="row"
                      display="flex"
                      alignItems="center"
                      spacing={1}
                      key={index}
                    >
                      <Grid item>
                        <Typography component="div" variant="body1">
                          {index === 0 ? 'Minimum Price:' : 'Maximum Price'}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography component="div" variant="subtitle1">
                          SGD {option}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}
              {filterValues[`${FilterNames.reviewRatingFilter}`] && (
                <Grid
                  container
                  direction="row"
                  display="flex"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <Typography component="div" variant="body1">
                      Guest Rating:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="div" variant="subtitle1">
                      {filterValues[`${FilterNames.reviewRatingFilter}`] }
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
        <Grid borderBottom="2px solid lightgrey" padding="15px">
          <Typography component="div" variant="subtitle1">
            Filter By Star Rating:
          </Typography>
          <StarRatingFilter
            checkBoxOptions={[1, 2, 3, 4, 5]}
            handleFilterChange={handleFilterChange}
            starRatingFilter={filterValues[`${FilterNames.starRatingFilter}`]}
          />
        </Grid>
        <Grid borderBottom="2px solid lightgrey" padding="15px">
          <Typography component="div" variant="subtitle1">
            Filter By Hotel Pricing:
          </Typography>
          {filterValues[`${FilterNames.priceFilter}`].length > 0 && (
            <RangeSlider
              handleFilterChange={handleFilterChange}
              options={filterValues[`${FilterNames.priceFilter}`] }
              priceFilterLimit={filterValues[`${FilterNames.priceFilterLimit}`] }
            />
          )}
          {!filterValues[`${FilterNames.priceFilter}`].length && <CircularProgress />}
        </Grid>
        <Grid borderBottom="2px solid lightgrey" padding="15px">
          <HotelFilter
            handleFilterChange={handleFilterChange}
            nameFilterValue={filterValues[`${FilterNames.nameFilter}`]}
          />
        </Grid>
        <Grid borderBottom="2px solid lightgrey" padding="15px">
          <DropDownComponent
            options={userRatingOptions}
            handleEventChange={handleFilterChange}
            optionValue={filterValues[`${FilterNames.reviewRatingFilter}`]}
            label={'Filter By Guest Ratings'}
            filterName={FilterNames.reviewRatingFilter}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FilterAndSorts;
