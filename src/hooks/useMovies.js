import { useEffect, useState } from 'react';

const apiKey = import.meta.env.VITE_API_KEY;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setLoading(true);
          setError('');

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error('Oooops something went wrong with fetching movies');

          const data = await res.json();

          if (data.Response === 'False') throw new Error('Movie not found');
          // handleCloseMovie();
          setMovies(data.Search);
          setError('');
        } catch (error) {
          if (error.name !== 'AbortError') setError(error.message);
        } finally {
          setLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, loading, error };
}
