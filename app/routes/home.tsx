import React, { useState, useEffect } from "react";
import FilmCard, { type Film } from "../components/FilmCard";
import { auth } from "../firebase";
import Auth from "../components/Auth";

export default function Home() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Film[]>([]);
  const [user, setUser] = useState<any>(null);
  const CARD_GAP = 24;

  // Film listesini fetch et
  useEffect(() => {
    setLoading(true);
    fetch("/films.json")
      .then((res) => {
        if (!res.ok) throw new Error("Film listesi yüklenemedi");
        return res.json();
      })
      .then((data) => {
        setFilms(data as Film[]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Kullanıcıyı Auth bileşeninden almak için bir callback fonksiyonu
  const handleAuthSuccess = (userObj: any) => {
    setUser(userObj);
  };

  const handleAddToFavorites = (film: Film) => {
    if (!favorites.find((f) => f.id === film.id)) {
      setFavorites([...favorites, film]);
    }
  };

  const handleRemoveFromFavorites = (film: Film) => {
    setFavorites(favorites.filter((f) => f.id !== film.id));
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    window.location.reload();
  };

  // Eğer kullanıcı yoksa Auth bileşenini göster
  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div style={{ maxWidth: '100vw', padding: '24px 0', minHeight: '100vh', background: '#fafafa' }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, maxWidth: 1200, margin: '0 auto' }}>
        <h1>Cineflex</h1>
        <button onClick={handleLogout} style={{ padding: "8px 16px", borderRadius: 4, background: "#f44336", color: "white", border: "none" }}>
          Log Out
        </button>
      </div>


      <div style={{ marginBottom: 32, maxWidth: 1200, margin: '0 auto' }}>
        <h2>Film List</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: `${CARD_GAP}px`,
            width: '100%',
            margin: 0
          }}>
            {films.map((film) => (
              <FilmCard
                key={film.id}
                film={film}
                onAddToFavorites={handleAddToFavorites}
                isFavorite={!!favorites.find((f) => f.id === film.id)}
              />
            ))}
          </div>
        )}
      </div>


      
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2>Favorites</h2>
        {favorites.length === 0 ? (
          <div>No favorite movies yet.</div>
        ) : (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: `${CARD_GAP}px`,
            width: '100%',
            margin: 0
          }}>
            {favorites.map((film) => (
              <FilmCard
                key={film.id}
                film={film}
                isFavorite={true}
                onAddToFavorites={() => {}}
              >
                <button
                  onClick={() => handleRemoveFromFavorites(film)}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'rgba(244,67,54,0.85)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    cursor: 'pointer',
                    zIndex: 2,
                    fontSize: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                  }}
                  title="Remove from favorites"
                >
                  ×
                </button>
              </FilmCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 