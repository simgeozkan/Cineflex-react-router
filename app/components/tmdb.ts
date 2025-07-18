export type TMDBMovie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

export async function fetchPopularMovies(apiKey: string, page: number = 1): Promise<TMDBMovie[]> {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch popular movies from TMDB');
  const data: any = await res.json();
  return (data.results || []).map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
  }));
}

export async function fetchNowPlayingMovies(apiKey: string, page: number = 1): Promise<TMDBMovie[]> {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch now playing movies from TMDB');
  const data: any = await res.json();
  return (data.results || []).map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
  }));
}

export async function fetchUpcomingMovies(apiKey: string, page: number = 1): Promise<TMDBMovie[]> {
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch upcoming movies from TMDB');
  const data: any = await res.json();
  return (data.results || []).map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
  }));
} 