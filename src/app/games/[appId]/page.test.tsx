import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import GamePage from './page';

afterEach(cleanup);

describe('game overview', () => {
  it('puts decision-relevant fixture answers before deeper evidence', async () => {
    const view = await GamePage({ params: Promise.resolve({ appId: '730' }) });
    render(view);

    expect(screen.getByRole('heading', { level: 1, name: 'Counter-Strike 2' })).toBeInTheDocument();
    const overview = screen.getByRole('region', { name: 'The useful answer first.' });
    expect(within(overview).getByText('473,263')).toBeInTheDocument();
    expect(within(overview).getByText('1,244,579')).toBeInTheDocument();
    expect(within(overview).getByText('1,862,531')).toBeInTheDocument();
    expect(within(overview).getByText(/85\.6%/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View Counter-Strike 2 on Steam (opens in a new tab)' })).toHaveAttribute(
      'href',
      'https://store.steampowered.com/app/730/',
    );
  });

  it('keeps unavailable price data explicit instead of inventing a value', async () => {
    const view = await GamePage({ params: Promise.resolve({ appId: '570' }) });
    render(view);

    const prices = screen.getByRole('region', { name: 'Regional price context stays gated.' });
    expect(within(prices).getByText('Not Applicable')).toBeInTheDocument();
    expect(within(prices).getByText(/does not substitute a guessed price/i)).toBeInTheDocument();
  });

  it('keeps raw evidence behind explicit progressive disclosure', async () => {
    const view = await GamePage({ params: Promise.resolve({ appId: '730' }) });
    render(view);

    expect(screen.getByText('Evidence and availability details')).toBeInTheDocument();
    expect(screen.getByText(/Historical movement, regional price quality/i)).toBeInTheDocument();
  });
});
