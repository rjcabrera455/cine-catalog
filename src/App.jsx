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
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { movies, loading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState('watched', []);

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
