import { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import HotelDetails from "./components/HotelDetails";
import FilterAndSorts from "./components/FiltersAndSort";

function App() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([])
  const [nameFilter, setNameFilter] = useState('');
  const [starRatingFilter, setStarRatingFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [priceFilterLimit, setPriceFilterLimit] = useState([]);
  const [reviewRatingFilter, setReviewRatingFilter] = useState('Any');
  const [sortOrder, setSortOrder] = useState('');

  const getPricingLimit= (hotels) =>{
   const pricing =  hotels.map((hotel)=>(hotel.price))
   setPriceFilter([Math.min(...pricing), Math.max(...pricing)])
   setPriceFilterLimit([Math.min(...pricing), Math.max(...pricing)])
  }
  const fetchHotelList = async () =>{
    const response = await fetch('https://61c3e5d2f1af4a0017d99115.mockapi.io/hotels/en')
    const data = await response.json();
    console.log(data)
    getPricingLimit(data)
    setHotels(data)
  }

  const resetFilters = ()=> {
    onRatingChange('Any')
    onNameChange('')
    onStarRatingChange([])
    getPricingLimit(hotels)
  }

  const onSortChange = (newValue) => {
    setSortOrder(newValue)
  }

  const onRatingChange = (newValue) => {
    setReviewRatingFilter(newValue)
  }


  const onNameChange = (newValue) => {
    setNameFilter(newValue)
  }

  const onStarRatingChange = (newValue) => {
    setStarRatingFilter(newValue)
  }

  const onPriceFilterChange = (newValue) => {
    setPriceFilter(newValue)
  }

  useEffect(() => {
    try {
      fetchHotelList()
    }catch(error){
      throw error
    }
  }, []);

  useEffect(() => {
    let result = hotels;

    // Filter by name
    if (nameFilter !=='') {
      result = result.filter(hotel => hotel.name.toLowerCase().includes(nameFilter.toLowerCase()));
    }

    // Filter by star rating
    if (starRatingFilter.length){
      result = result.filter(hotel =>
        starRatingFilter.includes(`${hotel.stars}`)
       );
    }
    // Filter by price
    result = result.filter(hotel =>
      hotel.price >= priceFilter[0] && hotel.price <= priceFilter[1]
    );
    let ratingLimit
    if (reviewRatingFilter) {
      switch (reviewRatingFilter) {
        case '9+':
          ratingLimit = 9;
          break;
        case '8+':
          ratingLimit = 8;
          break;
        case '7+':
          ratingLimit = 7;
          break;
        case '6+':
          ratingLimit = 6;
          break;
        default:
          ratingLimit = 0;
      }
    }
    // Filter by review rating
    result = result.filter(hotel =>
      hotel.rating >= ratingLimit
    );

    // Sort by price
    result.sort((a, b) => {
      if (sortOrder === 'Price (lowest first)') {
        return a.price - b.price;
      } else if (sortOrder === 'Price (highest first)') {
        return b.price - a.price;
      }else if (sortOrder === 'Property rating (high to low)'){
        return b.rating - a.rating;
      }else if (sortOrder === 'Property rating (low to high)'){
        return a.rating - b.rating;
      }
      return 0;
    });

    setFilteredHotels(result);
  }, [hotels, nameFilter, starRatingFilter, priceFilter, reviewRatingFilter, sortOrder]);

  const props = {
    nameFilterValue: nameFilter,
    onNameChange: onNameChange,
    setStarRatingFilter: setStarRatingFilter,
    starRatingFilter: starRatingFilter,
    onPriceFilterChange: onPriceFilterChange,
    pricingOptions: priceFilter,
    priceFilterLimit: priceFilterLimit,
    onSortChange: onSortChange,
    sortOption: sortOrder,
    onRatingChange: onRatingChange,
    guestRatingValue: reviewRatingFilter,
    resetFilters: resetFilters
  };
  

  return (
    <Box sx={{ flexGrow: 1, padding: 2, backgroundImage:
      "url('/resort.png')"}}>
      <Grid item container justifyContent='center' flexDirection='row' display='flex' spacing={1} maxHeight='100vh' overflow='hidden'>
        <Grid item xs={6} md={4} maxHeight='100vh' style={{overflowY: 'auto'}}>
            <FilterAndSorts {...props}/>
        </Grid>
        <Grid item xs={6} md={8} maxHeight='100vh' style={{overflowY: 'auto'}}>
          {filteredHotels.length > 0 && filteredHotels.map((hotel) => {
            return (
              <HotelDetails key={hotel.id} hotel={hotel} />
            )
          })}
          {!filteredHotels.length > 0 &&
               <Card sx={{ display: 'flex', marginBottom: 2, flexDirection: 'column', backgroundColor: 'rgba(255, 255, 255, 0.97)' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                         Please Reset your filters
                      </Typography>
                  </CardContent>
                </Card>
          }
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
