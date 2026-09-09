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
        onChange={(event) => { setQuery(event.target.value); setActive(-1); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') { setOpen(false); setActive(-1); }
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault(); setOpen(true);
            if (results.length) setActive((index) => event.key === 'ArrowDown' ? (index + 1) % results.length : (index <= 0 ? results.length - 1 : index - 1));
          }
          if (event.key === 'Enter' && open && results.length) {
            event.preventDefault(); setOpen(false); setQuery('');
            router.push(`/games/${results[active < 0 ? 0 : active].appId}`);
          }
        }}
        placeholder="Search games or AppID"
        autoComplete="off"
        aria-controls={open && query.trim() ? `${id}-results` : undefined}
        aria-expanded={open && query.trim().length > 0}
        aria-activedescendant={open && query.trim() && active >= 0 && active < results.length ? `${id}-option-${active}` : undefined}
        aria-autocomplete="list"
      />
      <span role="status" className="sr-only">{open && query.trim() ? `${results.length} results in the sample catalog.` : ''}</span>
      {open && query.trim() && (
        <div className="search__results">
          <ul id={`${id}-results`} role="listbox" aria-label="Game results">
          {results.length ? results.map((game) => (
            <li id={`${id}-option-${results.indexOf(game)}`} role="option" aria-selected={active === results.indexOf(game)} key={game.appId}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => { setOpen(false); setQuery(''); router.push(`/games/${game.appId}`); }}>
              <span className="game-mark" aria-hidden="true">{game.name.slice(0, 2).toUpperCase()}</span>
              <span><strong>{game.name}</strong><small>App {game.appId} · {game.type}</small></span>
              <span aria-hidden="true">→</span>
            </li>
          )) : null}
          </ul>
          {!results.length && <p>No matches in this sample catalog. Try “Dota” or “730”.</p>}
        </div>
      )}
    </div>
  );
}
