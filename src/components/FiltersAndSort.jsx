import { Card, CardContent, Rating, Typography, Grid, CircularProgress, Box, Button } from "@mui/material"
import RangeSlider from "./RangeSlider";
import HotelFilter from "./FormFilter";
import DropDownComponent from "./DropDownComponent";
import StarRatingFilter from "./StarRatingFilter";

const FilterAndSorts = ({onNameChange, nameFilterValue,starRatingFilter,setStarRatingFilter, onPriceFilterChange, pricingOptions, priceFilterLimit, onSortChange, sortOption, onRatingChange, guestRatingValue, resetFilters}) => {

    const sortByOptions = ['Price (lowest first)','Price (highest first)', 'Property rating (high to low)', 'Property rating (low to high)']
    const userRatingOptions = ['9+', '8+', '7+', '6+']

    return (
        <Card sx={{ display: 'flex', marginBottom: 2, flexDirection: 'column', backgroundColor: 'rgba(255, 255, 255, 0.97)'}}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Grid borderBottom='2px solid lightgrey' padding='15px'>
                    <DropDownComponent options={sortByOptions} handleEventChange={onSortChange} optionValue={sortOption} label={'Sort By'} />
                </Grid>
                <Grid borderBottom='2px solid lightgrey' padding='15px'>
                    <Box border=' 1px solid lightgrey' padding='10px'>
                        <Grid item container>
                            <Grid item xs = {6} justifyContent='flex-start' display='flex'>
                                <Typography component="div" variant="subtitle1">
                                    My Filters: 
                                </Typography>
                            </Grid>
                            <Grid item xs = {6} justifyContent='flex-end' display='flex'>
                                <Button onClick={resetFilters} color='secondary'>Clear</Button>
                            </Grid>
                        </Grid>
                        <Grid display='flex' flexDirection='column'>
                            {starRatingFilter.length > 0 && starRatingFilter.map((rating) => {
                                return (<Rating name="read-only" value={rating} readOnly/>)
                            })
                            }
                            {nameFilterValue && 
                             <Grid container direction='row' display='flex' alignItems='center' spacing={1}>
                             <Grid item>
                                 <Typography component="div" variant='body1'>
                                        Name Filter:
                                 </Typography>
                             </Grid>
                             <Grid item>
                                 <Typography component="div" variant='subtitle1'>
                                    {nameFilterValue}
                                 </Typography>
                             </Grid>
                         </Grid>
                            }
                            {guestRatingValue && 
                             <Grid container direction='row' display='flex' alignItems='center' spacing={1}>
                                <Grid item>
                                    <Typography component="div" variant='body1'>
                                            Guest Rating:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography component="div" variant='subtitle1'>
                                            {guestRatingValue}
                                    </Typography>
                                </Grid>
                            </Grid>
                            }
                        </Grid>
                    </Box>
                </Grid>
                <Grid borderBottom='2px solid lightgrey' padding='15px'>
                    <Typography component="div" variant="subtitle1">
                        Filter By Star Rating:
                    </Typography>
                    <StarRatingFilter checkBoxOptions={[1,2,3,4,5]} setStarRatingFilter={setStarRatingFilter} starRatingFilter={starRatingFilter}/>
                </Grid>
                <Grid borderBottom='2px solid lightgrey' padding='15px'>
                    <Typography component="div" variant="subtitle1">
                        Filter By Hotel Pricing:
                    </Typography>
                    {pricingOptions.length > 0 && <RangeSlider onPriceFilterChange={onPriceFilterChange} options={pricingOptions} priceFilterLimit={priceFilterLimit}/>}
                    {!pricingOptions.length && <CircularProgress />}
                </Grid>
                <Grid borderBottom='2px solid lightgrey' padding='15px'>
                    <HotelFilter onNameChange={onNameChange} nameFilterValue={nameFilterValue}/>
                </Grid>
                <Grid borderBottom='2px solid lightgrey' padding='15px'>
                    <DropDownComponent options={userRatingOptions} handleEventChange={onRatingChange} optionValue={guestRatingValue} label={'Filter By Guest Ratings'}/>
                </Grid>
            </CardContent>

        </Card>
    )
}

export default FilterAndSorts