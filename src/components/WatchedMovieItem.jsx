import { faX } from '@fortawesome/free-solid-svg-icons/faX';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function WatchedMovieItem({ classes, movie, onSelectMovie, onDeleteWatched }) {
  function handleDelete(e) {
    e.stopPropagation();
    onDeleteWatched(movie.imdbID);
  }
  return (
    <li
      className={`flex items-center gap-5 border rounded hover:bg-body cursor-pointer overflow-hidden relative ${classes}`}
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img src={movie.Poster} alt="" className="h-16 w-14" />
      <div>
        <div className="flex justify-between">
          <h1 className="text-xl mb-0">{movie.Title}</h1>
          <button
            className="bg-red-500 text-white  rounded-full h-6 w-6 absolute top-2.5 right-2.5"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
          </button>
        </div>
        <span>⭐ {movie.imdbRating}</span>
        <span className="ms-2">🌟 {movie.UserRating}</span>
        <span className="ms-2">⌛ {movie.Runtime}</span>
      </div>
    </li>
  );
}

export default WatchedMovieItem;
