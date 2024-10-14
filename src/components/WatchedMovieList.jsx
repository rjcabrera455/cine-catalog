import WatchedMovieItem from './WatchedMovieItem';

function WatchedMovieList({ movies, onSelectMovie, onDeleteWatched }) {
  console.log(movies);
  return (
    <ul>
      {movies.map((movie, index) => (
        <WatchedMovieItem
          classes={index === movies.length - 1 ? '' : 'mb-2.5'}
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
