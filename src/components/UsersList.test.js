
import React from 'react';
import { render, screen } from '@testing-library/react';
import UsersList from './UsersList';

describe('UsersList Component', () => {
  test('renders without crashing', () => {
    render(<UsersList users={[]} onAddUser={() => {}} />);

    
    expect(screen.getByTestId('users-list')).toBeInTheDocument();
  });
});
