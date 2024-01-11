import { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import FilterAndSorts from '../components/FiltersAndSort';
import HotelDetails from '../components/HotelDetails'
import { FilterNames } from '../types/filterName.dto';

const Home = () =>{
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filters, setFilters] = useState({
    nameFilter: '',
    starRatingFilter: [],
    priceFilter: [],
    priceFilterLimit: [],
    reviewRatingFilter: 'Any',
    sortOrder: ''
  });

  const getPricingLimit = hotels => {
    const pricing = hotels.map(hotel => hotel.price);
    handleFilterChange(FilterNames.priceFilter,[Math.min(...pricing), Math.max(...pricing)])
    handleFilterChange(FilterNames.priceFilterLimit,[Math.min(...pricing), Math.max(...pricing)])
  };
  const fetchHotelList = async () => {
    const response = await fetch(
      'https://61c3e5d2f1af4a0017d99115.mockapi.io/hotels/en'
    );
    const data = await response.json();
    console.log(data);
    getPricingLimit(data);
    setHotels(data);
  };

  const handleFilterChange = (filterName, value) => {
    console.log(filterName)
    setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
  };

  const resetFilters = () => {
    setFilters({
      ...filters,
      nameFilter: '',
      starRatingFilter: [],
      reviewRatingFilter: 'Any',
      sortOrder: ''
    });
    getPricingLimit(hotels);
  };

  useEffect(() => {
    try {
      fetchHotelList();
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    let result = hotels;
  
    if (filters.nameFilter) {
      result = result.filter(hotel =>
        hotel.name.toLowerCase().includes(filters.nameFilter.toLowerCase())
      );
    }
  
    if (filters.starRatingFilter.length) {
      result = result.filter(hotel =>
        filters.starRatingFilter.includes(`${hotel.stars}`)
      );
    }
  
    if (filters.priceFilter.length === 2) {
      result = result.filter(
        hotel => hotel.price >= filters.priceFilter[0] && hotel.price <= filters.priceFilter[1]
      );
    }
  
    const ratingLimits = {
      '9+': 9,
      '8+': 8,
      '7+': 7,
      '6+': 6
    };
  
    const ratingLimit = ratingLimits[filters.reviewRatingFilter] || 0;
    result = result.filter(hotel => hotel.rating >= ratingLimit);
  
    const sortingFunctions = {
      'Price (lowest first)': (a, b) => a.price - b.price,
      'Price (highest first)': (a, b) => b.price - a.price,
      'Property rating (high to low)': (a, b) => b.rating - a.rating,
      'Property rating (low to high)': (a, b) => a.rating - b.rating
    };
  
    result.sort(sortingFunctions[filters.sortOrder] || ((a, b) => 0));
  
    setFilteredHotels(result);
  }, [hotels, filters]);
  
  

  const props = {
    resetFilters: resetFilters,
    filterValues: filters,
    handleFilterChange: handleFilterChange,
  };

  return (
    <Box
      sx={{ flexGrow: 1, padding: 2, backgroundColor: '#fbf7f5'}}
    >
      <Grid
        item
        container
        justifyContent="center"
        flexDirection="row"
        display="flex"
        spacing={1}
      >
        <Grid
          item
          xs={6}
          md={4}
          maxHeight="100vh"
          style={{ overflowY: 'auto' }}
        >
          <FilterAndSorts {...props} />
        </Grid>
        <Grid
          item
          xs={6}
          md={8}
        >
          {filteredHotels.length > 0 &&
            filteredHotels.map(hotel => {
              return <HotelDetails key={hotel.id} hotel={hotel} />;
            })}
          {!filteredHotels.length > 0 && (
            <Card
              sx={{
                display: 'flex',
                marginBottom: 2,
                flexDirection: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0.97)',
              }}
            >
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  Please Reset your filters
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
