import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Rating,
  Collapse,
  Divider,
  Box,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  TextField,
} from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Reviews from './Reviews';

const HotelDetails = ({ hotel }) => {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [reviewsSearchValue, setReviewsSearchValue] = useState();
  const [filteredReviews, setFilteredReviews] = useState(hotel.reviews);

  const handleReviewsSearch = event => {
    const currentValue = event.target.value;
    setReviewsSearchValue(currentValue);

    if (currentValue !== '') {
        setFilteredReviews(
          hotel.reviews.filter(review => 
            review.description.toLowerCase().includes(currentValue.toLowerCase()) ||
            review.title.toLowerCase().includes(currentValue.toLowerCase())
          )
        );
      } else {
      setFilteredReviews(hotel.reviews);
    }
  };

  const handleReviewsToggle = () => {
    setReviewsOpen(!reviewsOpen);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: 2,
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: '100%', height: 200 }}
        image={hotel.photo}
        alt={hotel.name}
      />
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h5" data-testid={'hotel_name'}>
          {hotel.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {hotel.address}
        </Typography>
        <Grid
          item
          container
          flexDirection="row"
          display="flex"
          alignItems="center"
        >
          <Grid item xs={9}>
            <Rating name="read-only" value={hotel.stars} readOnly />
          </Grid>
          <Grid item xs={3} justifyContent="flex-end" display="flex">
            <Typography
              variant="h6"
              sx={{ color: 'green', fontSize: '1.5rem' }}
            >
              SGD ${hotel.price}
            </Typography>
          </Grid>
        </Grid>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Hotel Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <div dangerouslySetInnerHTML={{ __html: hotel.description }} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
      <Divider />
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Badge
          sx={{ cursor: 'pointer' }}
          onClick={handleReviewsToggle}
          badgeContent={hotel.rating}
          color={
            reviewsOpen && hotel.reviews.length > 0 ? 'primary' : 'secondary'
          }
        >
          <HotelIcon />
        </Badge>
        {reviewsOpen && hotel.reviews.length > 0 && (
          <TextField
            label="Filter Review"
            variant="outlined"
            value={reviewsSearchValue}
            onChange={handleReviewsSearch}
            sx={{
              margin: '8px 0',
              backgroundColor: 'white',
              width: '80%',
            }}
          />
        )}
        <Typography variant="body2">{hotel.reviews.length} Reviews</Typography>
      </Box>
      <Collapse in={reviewsOpen && hotel.reviews.length > 0}>
        <Reviews reviews={filteredReviews} />
      </Collapse>
    </Card>
  );
};

export default HotelDetails;
