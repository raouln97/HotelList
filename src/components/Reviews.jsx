import React from 'react';
import { Typography, Box, Card, CardContent, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const Reviews = ({ reviews }) => {
  return (
    <Box>
      {reviews.length > 0 &&
        reviews.map((review, index) => (
          <Card
            sx={{
              display: 'flex',
              marginBottom: 2,
              flexDirection: 'column',
              backgroundColor: 'rgba(255, 255, 255, 0.97)',
            }}
            key={index}
          >
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Grid
                container
                flexDirection="row"
                display="flex"
                spacing={1}
                alignItems="center"
              >
                <Grid item xs={6} alignItems="center">
                  <Typography key={index} variant="h6" sx={{ marginBottom: 1 }}>
                    {review.title}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  flexDirection="row"
                  display="flex"
                  justifyContent="flex-end"
                >
                  <StarIcon sx={{ color: 'gold' }} />
                  <Typography variant="subtitle1" style={{ marginLeft: 8 }}>
                    {review.rating} / 10
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                key={index}
                variant="subtitle2"
                sx={{ marginBottom: 1 }}
              >
                {review.description}
              </Typography>
              <Grid container flexDirection="row" display="flex" spacing={0.5}>
                <Grid item>
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{ marginBottom: 1 }}
                  >
                    {review.user.name} from
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{ marginBottom: 1 }}
                  >
                    {review.user.location}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
    </Box>
  );
};

export default Reviews;
