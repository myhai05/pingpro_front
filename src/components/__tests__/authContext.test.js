import React, { useContext } from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { AuthContext, AuthProvider } from '../Context/authContext';

// Mock axios
jest.mock('axios');

// Composant de test pour consommer le contexte
const TestComponent = () => {
  const { user } = useContext(AuthContext);
  return <div>{user ? `User: ${user.name}` : 'No User'}</div>;
};

describe('AuthProvider', () => {
  it('fetches and sets the user on mount', async () => {
    // Mock de la réponse d'axios
    const mockUser = { name: 'John Doe' };
    axios.get.mockResolvedValueOnce({ data: { responseData: mockUser } });

    // Rendre le composant AuthProvider avec un enfant de test
    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Vérifier que l'utilisateur est d'abord absent
    expect(getByText('No User')).toBeInTheDocument();

    // Attendre que l'effet useEffect se termine et que l'utilisateur soit mis à jour
    await waitFor(() => expect(getByText(`User: ${mockUser.name}`)).toBeInTheDocument());
  });

  it('handles errors when fetching the user token', async () => {
    // Simuler une erreur dans la requête axios
    axios.get.mockRejectedValueOnce(new Error('No token'));

    // Rendre le composant AuthProvider avec un enfant de test
    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Vérifier que l'utilisateur est d'abord absent
    expect(getByText('No User')).toBeInTheDocument();

    // Attendre la fin de l'effet useEffect (même si une erreur est survenue)
    await waitFor(() => expect(getByText('No User')).toBeInTheDocument());

    // Vérifier que l'utilisateur n'est toujours pas défini
    expect(getByText('No User')).toBeInTheDocument();
  });
});
