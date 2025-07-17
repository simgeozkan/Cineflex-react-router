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
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, width: 180, margin: 8, boxShadow: "0 2px 8px #eee", position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <img src={film.posterUrl} alt={film.title} style={{ width: "100%", borderRadius: 4, display: 'block' }} />
        {children}
      </div>
      <h4 style={{ margin: "8px 0 4px 0" }}>{film.title}</h4>
      <div style={{ color: "#888", fontSize: 14 }}>{film.year}</div>
      {onAddToFavorites && (
        <button
          style={{
            marginTop: 8,
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            background: 'white',
            border: 'none',
            borderRadius: 4,
            color: isFavorite ? '#f44336' : '#333',
            fontWeight: 500,
            fontSize: 14,
            cursor: isFavorite ? 'default' : 'pointer',
            opacity: isFavorite ? 0.7 : 1,
            boxShadow: isFavorite ? '0 0 0 1.5px #f44336' : '0 1px 2px rgba(0,0,0,0.04)'
          }}
          onClick={() => !isFavorite && onAddToFavorites(film)}
          disabled={isFavorite}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? '#f44336' : 'white'} stroke="#f44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4, flexShrink: 0 }}>
            <path d="M12 21s-8-7.64-8-12.5C4 5.42 6.42 3 9.5 3c1.74 0 3.41.81 4.5 2.08C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 4.86-8 12.5-8 12.5h-4z" />
          </svg>
          {isFavorite ? 'Favorited' : 'Add to Favorites'}
        </button>
      )}
    </div>
  );
};

export type { Film };
export default FilmCard; 