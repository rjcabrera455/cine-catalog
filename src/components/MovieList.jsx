import MovieItem from './MovieItem';

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul>
      {movies.map((movie, index) => (
        <MovieItem classes={index === movies.length - 1 ? '' : 'mb-2.5'} movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

export default MovieList;
