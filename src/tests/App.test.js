import React from 'react';
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';

const mockHotels = [
    {
      "id": 1,
      "name": "Hotel A",
      "rating": 7.7,
      "stars": 4,
      "address": "108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
      "photo": "https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
      "price": 95,
      "description": "<p>Boasting 15 food and beverage options, 2 swimming pools, and its own aquarium, Prince Hotel is right next to JR Shinagawa Train Station, from where Haneda Airport is only a 25-minute train ride away. This 39-storey hotel offers beautiful Tokyo views and free WiFi throughout the entire hotel.</p> <br> <p>The air-conditioned rooms at Shinagawa Prince Hotel have a fridge and an en suite bathroom with a bathtub and shower booth. Free toiletries and a hairdryer are provided. Guests will also find a personal locker in the room.</p> <br> <p>By train, Shibuya is 5 stops away and Shinjuku is a 16-minute ride. Tokyo Station is an 11-minute train ride away. Direct buses to and from Narita Airport stop at the hotel.</p> <br> <p>A city within a city, the hotel has its own movie theatre, bowling alley and tennis courts. Guests can enjoy a visit to the karaoke bar. The hotel also features a 24-hour front desk, indoor and outdoor pools, a sauna facility and massage services. Currency exchange service is available. Guests will find drink vending machines and a cash machine on site.</p> <br> <p>The 39th-floor Dining & Bar Table 9 Tokyo offers one of Tokyo’s best views. Restaurants serves unique Western cuisine, grill and steaks, while the bar lounge offers fusion tapas and drinks including whiskey, cocktails, sake and champagne. </p> <br> <p>Minato is a great choice for travellers interested in clean streets, friendly locals and culture.</p>",
      "reviews": [
        {
          "user": {
            "name": "Sue",
            "location": "Perth, WA"
          },
          "rating": 4.0,
          "title": "Fabulous Location",
          "description": "The location is fabulous. Two stations very close. Close to connections to evetywhere. Staff is wonderful. The cleaning staff is thorough and fast. Breakfast is tasty. Fitness room is great. Having a laundry accessible onsite was a lifesaver."
        }
      ]
    },
    {
        "id": 2,
        "name": "Hotel B",
        "rating": 9,
        "stars": 5,
        "address": "108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
        "photo": "https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
        "price": 120,
        "description": "<p>Boasting 15 food and beverage options, 2 swimming pools, and its own aquarium, Prince Hotel is right next to JR Shinagawa Train Station, from where Haneda Airport is only a 25-minute train ride away. This 39-storey hotel offers beautiful Tokyo views and free WiFi throughout the entire hotel.</p> <br> <p>The air-conditioned rooms at Shinagawa Prince Hotel have a fridge and an en suite bathroom with a bathtub and shower booth. Free toiletries and a hairdryer are provided. Guests will also find a personal locker in the room.</p> <br> <p>By train, Shibuya is 5 stops away and Shinjuku is a 16-minute ride. Tokyo Station is an 11-minute train ride away. Direct buses to and from Narita Airport stop at the hotel.</p> <br> <p>A city within a city, the hotel has its own movie theatre, bowling alley and tennis courts. Guests can enjoy a visit to the karaoke bar. The hotel also features a 24-hour front desk, indoor and outdoor pools, a sauna facility and massage services. Currency exchange service is available. Guests will find drink vending machines and a cash machine on site.</p> <br> <p>The 39th-floor Dining & Bar Table 9 Tokyo offers one of Tokyo’s best views. Restaurants serves unique Western cuisine, grill and steaks, while the bar lounge offers fusion tapas and drinks including whiskey, cocktails, sake and champagne. </p> <br> <p>Minato is a great choice for travellers interested in clean streets, friendly locals and culture.</p>",
        "reviews": [
          {
            "user": {
              "name": "Sue",
              "location": "Perth, WA"
            },
            "rating": 4.0,
            "title": "Fabulous Location",
            "description": "The location is fabulous. Two stations very close. Close to connections to evetywhere. Staff is wonderful. The cleaning staff is thorough and fast. Breakfast is tasty. Fitness room is great. Having a laundry accessible onsite was a lifesaver."
          }
        ]
      },
  ]

  beforeEach(() => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockHotels)
       })      
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  

test('filters hotels by name', async () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText('Filter by Name'), { target: { value: 'Hotel A' } });
  await waitFor(() => {
    expect(screen.getByText('Hotel A')).toBeInTheDocument();
  });
});

test('filters hotels by user review', async () => {
    render(<App />);
    const dropdowns = screen.getAllByRole('combobox', { name: /Sort By/i });
    await userEvent.click(dropdowns[1]);
    const option = await screen.findByRole('option', { name: '9+'});
    await userEvent.click(option);
    await waitFor(() => {
      expect(screen.getByText('Hotel B')).toBeInTheDocument();
    });
  });

test('filters hotels by review', async () => {
    render(<App />);

    const minTextbox = await screen.findByRole('textbox', { name: 'MIN' });
    const maxTextbox = await screen.findByRole('textbox', { name: 'MAX' });
    await userEvent.type(minTextbox, '95');
    await userEvent.type(maxTextbox, '100');


    await waitFor(() => {
        expect(screen.getByRole('textbox', { name: 'MIN' })).toBeInTheDocument();
      });
  });
