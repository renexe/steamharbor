'use client';

import { useRouter } from 'next/navigation';
import { useId, useMemo, useState } from 'react';
import type { Game } from '@/domain/game';

export function GlobalSearch({ games, compact = false }: { games: Game[]; compact?: boolean }) {
  const id = useId();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return [];
    return games
      .filter((game) => game.name.toLocaleLowerCase().includes(normalized) || String(game.appId) === normalized)
      .slice(0, 5);
  }, [games, query]);

  const hasQuery = query.trim().length > 0;
  const isExpanded = open && hasQuery;

  function navigate(appId: number) {
    setOpen(false);
    setActive(-1);
    setQuery('');
    router.push(`/games/${appId}`);
  }

  return (
    <div className={`search ${compact ? 'search--compact' : ''}`}>
      <label htmlFor={id} className="sr-only">Search games by name or AppID</label>
      <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
        <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <input
        id={id}
        type="search"
        role="combobox"
        value={query}
        onChange={(event) => { setQuery(event.target.value); setActive(-1); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setOpen(false);
            setActive(-1);
          }
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setOpen(true);
            if (results.length) {
              setActive((index) => event.key === 'ArrowDown'
                ? (index + 1) % results.length
                : (index <= 0 ? results.length - 1 : index - 1));
            }
          }
          if (event.key === 'Enter' && isExpanded && results.length) {
            event.preventDefault();
            navigate(results[active < 0 ? 0 : active].appId);
          }
        }}
        placeholder="Search games or AppID"
        autoComplete="off"
        aria-controls={isExpanded ? `${id}-results` : undefined}
        aria-expanded={isExpanded}
        aria-activedescendant={isExpanded && active >= 0 && active < results.length ? `${id}-option-${active}` : undefined}
        aria-autocomplete="list"
      />
      <span role="status" className="sr-only">{isExpanded ? `${results.length} results in the sample catalog.` : ''}</span>
      {isExpanded && (
        <div className="search__results">
          <ul id={`${id}-results`} role="listbox" aria-label="Game results">
            {results.map((game, index) => (
              <li
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={active === index}
                key={game.appId}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActive(index)}
                onClick={() => navigate(game.appId)}
              >
                <span className="game-mark" aria-hidden="true">{game.name.slice(0, 2).toUpperCase()}</span>
                <span><strong>{game.name}</strong><small>App {game.appId} · {game.type}</small></span>
                <span className="search__result-arrow" aria-hidden="true">→</span>
              </li>
            ))}
          </ul>
          {!results.length && <p>No matches in this sample catalog. Try “Dota” or “730”.</p>}
        </div>
      )}
    </div>
  );
}
