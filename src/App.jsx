import Card from './components/Card';
import Main from './components/Main';
import ErrorMessage from './components/ErrorMessage';
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import MovieDetails from './components/MovieDetails';
import WatchedSummary from './components/WatchedSummary';
import WatchedMovieList from './components/WatchedMovieList';

const apiKey = import.meta.env.VITE_API_KEY;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => {
    const data = JSON.parse(localStorage.getItem('watched'));
    return data;
  });
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

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

  return (
    <>
      <Navbar query={query} setQuery={setQuery} />
      <Main>
        <Card classes="col-span-3 lg:col-span-1 hvh-5r">
          {loading && <Loader />}
          {!loading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage error={error} />}
        </Card>

        {selectedId ? (
          <Card classes="col-span-3 lg:col-span-2">
            <MovieDetails
              selectedId={selectedId}
              apiKey={apiKey}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          </Card>
        ) : (
          <Card classes="col-span-3 lg:col-span-2">
            <WatchedSummary watched={watched} />
            <WatchedMovieList
              movies={watched}
              onSelectMovie={handleSelectMovie}
              onDeleteWatched={handleDeleteWatched}
            />
          </Card>
        )}
      </Main>
    </>
  );
}
