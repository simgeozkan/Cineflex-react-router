import React, { useState, useEffect } from "react";
import FilmCard, { type Film } from "../components/FilmCard";
import Auth from "../components/Auth";
import { fetchPopularMovies, fetchNowPlayingMovies, fetchUpcomingMovies, type TMDBMovie } from "../components/tmdb";
import { useAuth } from "../components/AuthContext";
import Welcome from "../welcome/welcome";

export default function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<TMDBMovie[]>([]);
  const [nowPlayingLoading, setNowPlayingLoading] = useState(true);
  const [nowPlayingError, setNowPlayingError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Film[]>([]);
  const [popularMovies, setPopularMovies] = useState<TMDBMovie[]>([]);
  const [popularLoading, setPopularLoading] = useState(true);
  const [popularError, setPopularError] = useState<string | null>(null);
  const [upcomingMovies, setUpcomingMovies] = useState<TMDBMovie[]>([]);
  const [upcomingLoading, setUpcomingLoading] = useState(true);
  const [upcomingError, setUpcomingError] = useState<string | null>(null);
  const [showPopular, setShowPopular] = useState(false);
  const [showNowPlaying, setShowNowPlaying] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [showFavorites, setShowFavorites] = useState(true);
  const CARD_GAP = 24;
  const { user, logout } = useAuth();


  //3 kategoride API yardimiyla filmleri cekip kategoriler altinda gosterdik

  // TMDB'den now playing filmleri çek
  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    if (!apiKey) return;
    setNowPlayingLoading(true);
    fetchNowPlayingMovies(apiKey)
      .then((movies) => {
        setNowPlayingMovies(movies);
        setNowPlayingLoading(false);
      })
      .catch((err) => {
        setNowPlayingError(err.message);
        setNowPlayingLoading(false);
      });
  }, []);

  // TMDB'den popüler filmleri çek
  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    if (!apiKey) return;
    setPopularLoading(true);
    fetchPopularMovies(apiKey)
      .then((movies) => {
        setPopularMovies(movies);
        setPopularLoading(false);
      })
      .catch((err) => {
        setPopularError(err.message);
        setPopularLoading(false);
      });
  }, []);




  // TMDB'den upcoming filmleri çek


  useEffect(() => {

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    if (!apiKey) return;

    setUpcomingLoading(true);

    fetchUpcomingMovies(apiKey)
      .then((movies) => {
        setUpcomingMovies(movies);
        setUpcomingLoading(false);
      })

      .catch((err) => {
        setUpcomingError(err.message);
        setUpcomingLoading(false);

      });
  }, []);




// tetikleyecegimiz fonksiyonlari buraya ekledik

  const handleAddToFavorites = (film: Film) => {
    if (!favorites.find((f) => f.id === film.id)) {
      setFavorites([...favorites, film]);
    }
  };

  const handleRemoveFromFavorites = (film: Film) => {
    setFavorites(favorites.filter((f) => f.id !== film.id));
  };


  // Ekranda gosterilecek logo ve logout butonu burda tanimlandi.ayrica APi den gelen filmler card yapisi icinde burada listelenecek

  return (

   
    <div style={{ maxWidth: '100vw', padding: '24px 8px', minHeight: '100vh', background: '#fafafa' }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, maxWidth: 1400, margin: '0 auto 0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>

            <div style={{ marginRight: 16 }}>
              <Welcome />
            </div>
          {/* Cineflex logo tasarimi */}

          <span style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontWeight: 900,
            fontSize: 36,
            letterSpacing: 2,
            color: '#fff',
            background: 'linear-gradient(90deg, #d32f2f 60%, #fff 100%)',
            padding: '8px 28px 8px 20px',
            borderRadius: '16px 40px 16px 8px',
            boxShadow: '0 2px 12px rgba(211,47,47,0.10)',
            border: '2px solid #d32f2f',
            textShadow: '0 2px 8px #b71c1c, 0 1px 0 #fff',
            userSelect: 'none',
            lineHeight: 1.1,
            marginRight: 8
          }}>
            Cineflex 
          </span>
        </div>
    
 
    {/* Log out Buton tasarimi*/}
        <button onClick={logout} style={{ padding: "8px 16px", borderRadius: 4, background: "#f44336", color: "white", border: "none" }}>
          LogOut 
        </button>


      </div>
    <div style={{ marginBottom: 32, maxWidth: 1400, margin: '0 auto' }}>



    {/* Popular Movies Toggle */}
        <div style={{ marginBottom: 32 }}>
          <h2
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: '2rem',
              fontWeight: 800,
              margin: 0
            }}
            onClick={() => setShowPopular((v) => !v)}
          >
            <span>{showPopular ? '▼' : '►'}</span> Popular Movies
          </h2>
          {showPopular && (
            popularLoading ? (
              <div>Loading...</div>
            ) : popularError ? (
              <div style={{ color: "red" }}>{popularError}</div>
            ) : (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: `${CARD_GAP}px`,
                width: '100%',
                margin: 0
              }}>
                {popularMovies.map((movie) => (
                  <FilmCard
                    key={movie.id}
                    film={{
                      id: movie.id,
                      title: movie.title,
                      posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
                      year: movie.release_date ? movie.release_date.slice(0, 4) : ''
                    }}
                    onAddToFavorites={handleAddToFavorites}
                    isFavorite={!!favorites.find((f) => f.id === movie.id)}
                  />
                ))}
              </div>
            )
          )}
        </div>


 {/* Now Playing Toggle */}
        <div style={{ marginBottom: 32 }}>
          <h2
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: '2rem',
              fontWeight: 800,
              margin: 0
            }}
            onClick={() => setShowNowPlaying((v) => !v)}
          >
            <span>{showNowPlaying ? '▼' : '►'}</span> Now Playing
          </h2>
          {showNowPlaying && (
            nowPlayingLoading ? (
              <div>Loading...</div>
            ) : nowPlayingError ? (
              <div style={{ color: "red" }}>{nowPlayingError}</div>
            ) : (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: `${CARD_GAP}px`,
                width: '100%',
                margin: 0
              }}>
                {nowPlayingMovies.map((movie) => (
                  <FilmCard
                    key={movie.id}
                    film={{
                      id: movie.id,
                      title: movie.title,
                      posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
                      year: movie.release_date ? movie.release_date.slice(0, 4) : ''
                    }}
                    onAddToFavorites={handleAddToFavorites}
                    isFavorite={!!favorites.find((f) => f.id === movie.id)}
                  />
                ))}
              </div>
            )
          )}
        </div>




{/* Upcoming Toggle */}
        <div style={{ marginBottom: 32 }}>
          <h2
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: '2rem',
              fontWeight: 800,
              margin: 0
            }}
            onClick={() => setShowUpcoming((v) => !v)}
          >
            <span>{showUpcoming ? '▼' : '►'}</span> Upcoming
          </h2>
          {showUpcoming && (
            upcomingLoading ? (
              <div>Loading...</div>
            ) : upcomingError ? (
              <div style={{ color: "red" }}>{upcomingError}</div>
            ) : (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: `${CARD_GAP}px`,
                width: '100%',
                margin: 0
              }}>
                {upcomingMovies.map((movie) => (
                  <FilmCard
                    key={movie.id}
                    film={{
                      id: movie.id,
                      title: movie.title,
                      posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
                      year: movie.release_date ? movie.release_date.slice(0, 4) : ''
                    }}
                    onAddToFavorites={handleAddToFavorites}
                    isFavorite={!!favorites.find((f) => f.id === movie.id)}
                  />
                ))}
              </div>
            )
          )}
        </div>
      </div>

    {/* Favorites Toggle */}
      
      <div style={{ maxWidth: 1400, margin: '0 auto', marginBottom: 32 }}>
        <div style={{ marginBottom: 32 }}>
          <h2
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: '2rem',
              fontWeight: 800,
              margin: 0
            }}
            onClick={() => setShowFavorites((v) => !v)}
          >
            <span>{showFavorites ? '▼' : '►'}</span> Favorites
          </h2>
          {showFavorites && (
            favorites.length === 0 ? (
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
                    onAddToFavorites={() => handleRemoveFromFavorites(film)} // fonksiyon tetiklenir
                  />
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}