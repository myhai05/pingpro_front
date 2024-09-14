import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteOffer from './deleteOffer';
import axios from 'axios';

jest.mock('axios');

describe('DeleteOffer Component', () => {

  const onDeleteMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button and handles successful delete', async () => {

    render(<DeleteOffer offerId="12345" onDelete={onDeleteMock} />);

    fireEvent.click(screen.getByText(/Supprimer/i));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}api/offers/delete-offer/12345`);
      expect(onDeleteMock).toHaveBeenCalled();
    });
  });
});
