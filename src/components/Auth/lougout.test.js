import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Logout from './logout';
import { AuthContext } from '../Context/authContext';


// Create a mock axios instance
const mockAxios = new MockAdapter(axios);

describe('Logout Component', () => {


  it('redirects to home on error', async () => {
    // Mock the axios GET request to logout with an error
    mockAxios.onGet(`${process.env.REACT_APP_API_URL}api/logout`).networkError();

    // Mock window.location
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '/' };

    render(
      <AuthContext.Provider value={{ setUser: jest.fn() }}>
        <Logout />
      </AuthContext.Provider>
    );

    const button = screen.getByText('Quitter');
    fireEvent.click(button);

    // Await async changes
    await screen.findByText('Quitter');

    // Check if window.location was set to "/"
    expect(window.location.href).toBe('/');

    // Restore window.location
    window.location = originalLocation;
  });
});
