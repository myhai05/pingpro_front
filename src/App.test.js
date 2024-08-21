import React, { act } from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { AuthContext } from './components/Context/authContext';

test('renders learn react link', () => {
  const mockAuthContextValue = { user: { name: 'Test User', email: 'test@example.com' } };

  act(() => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <App />
      </AuthContext.Provider>
    );
  });

});