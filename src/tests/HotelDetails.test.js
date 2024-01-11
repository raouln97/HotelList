import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HotelDetails from '../components/HotelDetails';

describe('HotelDetails Component Test', () => {
  const mockHotel = {
    id: 1,
    name: 'Hotel A',
    rating: 7.7,
    stars: 4,
    address: '108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan',
    photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg',
    price: 95,
    description:
      '<p>Boasting 15 food and beverage options, 2 swimming pools, and its own aquarium, Prince Hotel is right next to JR Shinagawa Train Station, from where Haneda Airport is only a 25-minute train ride away. This 39-storey hotel offers beautiful Tokyo views and free WiFi throughout the entire hotel.</p> <br> <p>The air-conditioned rooms at Shinagawa Prince Hotel have a fridge and an en suite bathroom with a bathtub and shower booth. Free toiletries and a hairdryer are provided. Guests will also find a personal locker in the room.</p> <br> <p>By train, Shibuya is 5 stops away and Shinjuku is a 16-minute ride. Tokyo Station is an 11-minute train ride away. Direct buses to and from Narita Airport stop at the hotel.</p> <br> <p>A city within a city, the hotel has its own movie theatre, bowling alley and tennis courts. Guests can enjoy a visit to the karaoke bar. The hotel also features a 24-hour front desk, indoor and outdoor pools, a sauna facility and massage services. Currency exchange service is available. Guests will find drink vending machines and a cash machine on site.</p> <br> <p>The 39th-floor Dining & Bar Table 9 Tokyo offers one of Tokyo’s best views. Restaurants serves unique Western cuisine, grill and steaks, while the bar lounge offers fusion tapas and drinks including whiskey, cocktails, sake and champagne. </p> <br> <p>Minato is a great choice for travellers interested in clean streets, friendly locals and culture.</p>',
    reviews: [
      {
        user: {
          name: 'Sue',
          location: 'Perth, WA',
        },
        rating: 4.0,
        title: 'Fabulous Location',
        description:
          'The location is fabulous. Two stations very close. Close to connections to evetywhere. Staff is wonderful. The cleaning staff is thorough and fast. Breakfast is tasty. Fitness room is great. Having a laundry accessible onsite was a lifesaver.',
      },
      {
        user: {
          name: 'John',
          location: 'Perth, WA',
        },
        rating: 4.0,
        title: 'Great Place',
        description:
          'Amazing and cool!',
      },
    ],
  }

  const openReviewSection = async () => {
    const badge = screen.getByTestId('badge-reviews');
    await userEvent.click(badge);
    await waitFor(() => {
      expect(screen.getByLabelText('Filter Review')).toBeInTheDocument();
    });
  };


  test('displays all reviews initially', () => {
    render(<HotelDetails hotel={mockHotel} />);
    mockHotel.reviews.forEach((review) => {
      expect(screen.getByText(review.title)).toBeInTheDocument();
    });
  });

  test('filters reviews by keyword in title', async () => {
    render(<HotelDetails hotel={mockHotel} />);
    await openReviewSection();
    const filterInput = screen.getByLabelText('Filter Review');
    const keyword = 'Fabulous'; 
    fireEvent.change(filterInput, { target: { value: keyword } });
    await waitFor(() => {
        expect(screen.getByText('Fabulous Location')).toBeInTheDocument();
    });
    expect(screen.queryByText('Great Place')).not.toBeInTheDocument();
  });

  test('filters reviews by keyword in description', async () => {
    render(<HotelDetails hotel={mockHotel} />);
    await openReviewSection();
    const filterInput = screen.getByLabelText('Filter Review');
    const keyword = 'stations';
    fireEvent.change(filterInput, { target: { value: keyword } });
    await waitFor(() => {
      expect(screen.getByText('Fabulous Location')).toBeInTheDocument();
    });
    expect(screen.queryByText('Great Place')).not.toBeInTheDocument();
  });

  test('no reviews displayed for a keyword not in any review', async () => {
    render(<HotelDetails hotel={mockHotel} />);
    await openReviewSection();
    const filterInput = screen.getByLabelText('Filter Review');
    fireEvent.change(filterInput, { target: { value: 'nonexistentKeyword' } });
    await waitFor(() => {
        expect(screen.queryByText('Fabulous Location')).not.toBeInTheDocument();
    });
    expect(screen.queryByText('Great Place')).not.toBeInTheDocument();
  });
});
