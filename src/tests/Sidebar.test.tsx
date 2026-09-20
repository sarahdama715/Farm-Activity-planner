import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Sidebar from '@/components/Sidebar';

vi.mock('@/components/AppProvider', () => ({
  useApp: () => ({
    farmer: {
      name: 'Test Farmer',
      email: 'test@example.com',
    },
    logout: vi.fn(),
  }),
}));

describe('Sidebar', () => {
  it('renders the main navigation links', () => {
    render(<Sidebar />);

expect(screen.getByRole('link', { name: /Dashboard/i })).toBeInTheDocument();
expect(screen.getByRole('link', { name: /Generate Plan/i })).toBeInTheDocument();
expect(screen.getByRole('link', { name: /Resource Allocation/i })).toBeInTheDocument();
expect(screen.getByRole('link', { name: /Crop Management/i })).toBeInTheDocument();
expect(screen.getByRole('link', { name: /Settings/i })).toBeInTheDocument();
  });
});