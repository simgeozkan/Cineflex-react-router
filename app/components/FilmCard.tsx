import React from "react";

type Film = {
  id: number;
  title: string;
  posterUrl: string;
  year: string;
};

type Props = {
  film: Film;
  onAddToFavorites?: (film: Film) => void;
  isFavorite?: boolean;
  children?: React.ReactNode;
};

const FilmCard: React.FC<Props> = ({ film, onAddToFavorites, isFavorite, children }) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  return (
    <div
      style={{
        position: 'relative',
        width: 220,
        minHeight: 370,
        background: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        margin: 8,
        transition: 'transform 0.18s, box-shadow 0.18s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
      className="film-card"
      onMouseOver={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.04)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.16)';
      }}
      onMouseOut={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: 320, overflow: 'hidden' }}>
        <img
          src={film.posterUrl}
          alt={film.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Kalp simgesi sağ üstte overlay */}
        {onAddToFavorites && (
          <button
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(255,255,255,0.85)',
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.10)',
              cursor: 'pointer',
              zIndex: 2,
              transition: 'background 0.15s',
              padding: 0
            }}
            onClick={e => {
              e.stopPropagation();
              if (onAddToFavorites) onAddToFavorites(film);
            }}
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill={isFavorite ? '#f44336' : 'white'} stroke="#f44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21s-8-7.64-8-12.5C4 5.42 6.42 3 9.5 3c1.74 0 3.41.81 4.5 2.08C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 4.86-8 12.5-8 12.5h-4z" />
            </svg>
          </button>
        )}
        {children}
      </div>
      <div style={{ padding: '16px 12px 12px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 4, textShadow: '0 1px 2px #fff' }}>{film.title}</div>
        <div style={{ color: '#888', fontSize: 15 }}>{film.year}</div>
      </div>
    </div>
  );
};

export type { Film };
export default FilmCard; 