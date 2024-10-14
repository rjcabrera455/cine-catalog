function MovieItem({ classes, movie, onSelectMovie }) {
  return (
    <li
      className={`flex items-center gap-5 border rounded hover:bg-body cursor-pointer overflow-hidden ${classes}`}
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img src={movie.Poster} alt="" className="h-16 w-14" />
      <div>
        <h1 className="text-xl mb-0">{movie.Title}</h1>
        <span className="text-sm font-light">{movie.Year}</span>
      </div>
    </li>
  );
}

export default MovieItem;
