import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Pour les assertions DOM
import Dashboard from '../Dashboard/dashboard';

// Mock des composants enfants
jest.mock('../Dashboard/userList', () => () => <div>User List Component</div>);
jest.mock('../Dashboard/offerList', () => () => <div>Offer List Component</div>);
jest.mock('../Dashboard/display', () => () => <div>Display Component</div>);
jest.mock('../Dashboard/notificationsDisplay', () => () => <div>Notifications Component</div>);

describe('Dashboard Component', () => {
  it('renders the correct component when each tab is clicked', () => {
    render(<Dashboard />);

    // Vérifier que le composant UserList est rendu par défaut
    expect(screen.getByText('User List Component')).toBeInTheDocument();

    // Cliquer sur l'onglet "Notifications" et vérifier le rendu
    fireEvent.click(screen.getByText('Notifications'));
    expect(screen.getByText('Notifications Component')).toBeInTheDocument();

    // Cliquer sur l'onglet "Offres" et vérifier le rendu
    fireEvent.click(screen.getByText('Offres'));
    expect(screen.getByText('Offer List Component')).toBeInTheDocument();

    // Cliquer sur l'onglet "Posts" et vérifier le rendu
    fireEvent.click(screen.getByText('Posts'));
    expect(screen.getByText('Display Component')).toBeInTheDocument();

    // Revenir à l'onglet "User" et vérifier le rendu
    fireEvent.click(screen.getByText('User'));
    expect(screen.getByText('User List Component')).toBeInTheDocument();
  });

  it('applies the active class to the correct button when clicked', () => {
    render(<Dashboard />);

    // Par défaut, le bouton "User" doit avoir la classe "active"
    expect(screen.getByText('User').classList.contains('active')).toBe(true);

    // Cliquer sur "Notifications" et vérifier que le bouton reçoit la classe "active"
    fireEvent.click(screen.getByText('Notifications'));
    expect(screen.getByText('Notifications').classList.contains('active')).toBe(true);
    expect(screen.getByText('User').classList.contains('active')).toBe(false);

    // Cliquer sur "Offres" et vérifier que le bouton reçoit la classe "active"
    fireEvent.click(screen.getByText('Offres'));
    expect(screen.getByText('Offres').classList.contains('active')).toBe(true);
    expect(screen.getByText('Notifications').classList.contains('active')).toBe(false);

    // Cliquer sur "Posts" et vérifier que le bouton reçoit la classe "active"
    fireEvent.click(screen.getByText('Posts'));
    expect(screen.getByText('Posts').classList.contains('active')).toBe(true);
    expect(screen.getByText('Offres').classList.contains('active')).toBe(false);
  });
});
