import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from '../Auth/signIn';

// Mock d'axios
jest.mock('axios');

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SignIn Component', () => {
  it('renders the sign-in form', () => {
    render(
      <AuthContext.Provider value={{ setUser: jest.fn() }}>
        <Router>
          <SignIn />
        </Router>
      </AuthContext.Provider>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByText(/Se connecter/i)).toBeInTheDocument();
  });

  it('displays error messages for invalid inputs', async () => {
    render(
      <AuthContext.Provider value={{ setUser: jest.fn() }}>
        <Router>
          <SignIn />
        </Router>
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText(/Se connecter/i));

    await waitFor(() => {
      const errorMessages = screen.getAllByText(/Requis/i);
      expect(errorMessages.length).toBe(2); // Assurez-vous d'attendre deux messages "Requis"
    });
  });

  it('submits the form successfully and redirects the user', async () => {
    const userData = { role: 'user', email: 'test@example.com' };
    axios.post.mockResolvedValueOnce({ status: 200, data: { responseData: userData } });

    const setUser = jest.fn();

    render(
      <AuthContext.Provider value={{ setUser }}>
        <Router>
          <SignIn />
        </Router>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/Se connecter/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}api/login`,
        {
          email: 'test@example.com',
          password: 'password123',
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      expect(setUser).toHaveBeenCalledWith(userData);
      expect(mockNavigate).toHaveBeenCalledWith('/offers'); // Ajustez la route si nécessaire
    });
  });

  it('displays an error message when the login fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <AuthContext.Provider value={{ setUser: jest.fn() }}>
        <Router>
          <SignIn />
        </Router>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByText(/Se connecter/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}api/login`,
        {
          email: 'wrong@example.com',
          password: 'wrongpassword',
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      // Assurez-vous que le message d'erreur correspond à ce qui est affiché dans le composant
      expect(screen.getByText(/Une erreur est survenue lors de la connexion/i)).toBeInTheDocument();
    });
  });
});
