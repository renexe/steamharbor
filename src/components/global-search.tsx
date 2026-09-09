'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import type { Game } from '@/domain/game';

export function GlobalSearch({ games, compact = false }: { games: Game[]; compact?: boolean }) {
  const id = useId();
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return [];
    return games.filter((game) => game.name.toLocaleLowerCase().includes(normalized) || String(game.appId) === normalized).slice(0, 5);
  }, [games, query]);

  return (
    <div className={`search ${compact ? 'search--compact' : ''}`}>
      <label htmlFor={id} className="sr-only">Search games by name or AppID</label>
      <span aria-hidden="true" className="search__icon">⌕</span>
      <input
        id={id}
        type="search"
        role="combobox"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search games or AppID"
        autoComplete="off"
        aria-controls={`${id}-results`}
        aria-expanded={query.length > 0}
        aria-autocomplete="list"
      />
      <kbd aria-hidden="true">/</kbd>
      {query && (
        <div className="search__results" id={`${id}-results`} role="region" aria-live="polite">
          {results.length ? results.map((game) => (
            <Link href={`/games/${game.appId}`} key={game.appId}>
              <span className="game-mark" aria-hidden="true">{game.name.slice(0, 2).toUpperCase()}</span>
              <span><strong>{game.name}</strong><small>App {game.appId} · {game.type}</small></span>
              <span aria-hidden="true">→</span>
            </Link>
          )) : <p>No games found. Try a title or exact AppID.</p>}
        </div>
      )}
    </div>
  );
}
