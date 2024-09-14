import React from 'react';
import { render, screen } from '@testing-library/react';
import Logout from './logout'
import { AuthContext } from '../Context/authContext';

describe('Display Logout component', () => {
  it('renders the Quitter button', () => {
    // Mock the AuthContext
    const setUserMock = jest.fn();

    render(
      <AuthContext.Provider value={{ setUser: setUserMock }}>
        <Logout />
      </AuthContext.Provider>
    );

    const quitterButton = screen.getByRole('button', { name: /Quitter/i });
    expect(quitterButton).toBeInTheDocument();
  });
});
