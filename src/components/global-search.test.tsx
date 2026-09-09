import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { GlobalSearch } from './global-search';
import { games } from '@/fixtures/games';

const { push } = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe('global search', () => {
  it('supports keyboard selection and closes after navigation', () => {
    render(<GlobalSearch games={games} />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'dota' } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(push).toHaveBeenCalledWith('/games/570');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });
  it('finds exact AppID and dismisses with Escape', () => {
    render(<GlobalSearch games={games} />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: '730' } });
    expect(screen.getByRole('option')).toHaveTextContent('Counter-Strike 2');
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  it('explains empty results without suggesting the full catalog was searched', () => {
    render(<GlobalSearch games={games} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'missing' } });
    expect(screen.getByText(/No matches in this sample catalog/)).toBeInTheDocument();
  });
});
