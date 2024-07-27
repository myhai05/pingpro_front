import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Logout from './logout';
import { AuthContext } from '../Context/authContext';
import Cookies from 'js-cookie';

// Create a mock axios instance
const mockAxios = new MockAdapter(axios);

describe('Logout Component', () => {
  it('logs out the user and removes the cookie', async () => {
    // Mock the axios GET request to logout
    mockAxios.onGet(`${process.env.REACT_APP_API_URL}api/logout`).reply(200);

    // Mock Cookies.remove
    const removeSpy = jest.spyOn(Cookies, 'remove');

    // Create a mock setUser function
    const setUser = jest.fn();

    render(
      <AuthContext.Provider value={{ setUser }}>
        <Logout />
      </AuthContext.Provider>
    );

    const button = screen.getByText('Quitter');
    fireEvent.click(button);

    // Await async changes
    await screen.findByText('Quitter');

    // Check if the cookie was removed
    expect(removeSpy).toHaveBeenCalledWith('jwt', { expires: 1 });

    // Check if setUser was called with null
    expect(setUser).toHaveBeenCalledWith(null);
  });

  it('redirects to home on error', async () => {
    // Mock the axios GET request to logout with an error
    mockAxios.onGet(`${process.env.REACT_APP_API_URL}api/logout`).networkError();

    // Mock window.location
    delete window.location;
    window.location = { href: '' };

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
  });
});