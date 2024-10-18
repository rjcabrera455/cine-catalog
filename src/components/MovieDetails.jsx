import { useEffect, useRef, useState } from 'react';
import Loader from './Loader';
import StarRating from './StarRating';
import { useKey } from '../hooks/useKey';

const apiKey = import.meta.env.VITE_API_KEY;

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.UserRating;

  const countRef = useRef(0);

  useKey('Escape', onCloseMovie);

  function handleAdd() {
    const watchedMovie = {
      ...movie,
      Runtime: Number(movie.Runtime.split(' ').at(0)),
      UserRating: userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(watchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    if (userRating) {
      countRef.current = countRef.current + 1;
    }
  }, [userRating]);

  // Get movie details
  useEffect(() => {
    setLoading(true);
    async function getMovieDetails() {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
      );
      const data = await res.json();
      setUserRating(0);
      setMovie(data);
      setLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!movie.Title) return;

    document.title = movie.Title;

    return function () {
      document.title = 'Cine Catalog';
    };
  });

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="movie-details md:flex gap-5">
          <img
            src={movie.Poster}
            alt=""
            className="rounded-md w-full h-60vh md:size-1/3 object-cover mb-2.5 md:mb-0"
          />
          <div>
            <header className="mb-2.5">
              <h1 className="text-2xl mb-2.5">{movie.Title}</h1>
              <p className="mb-2.5">
                {movie.Released} • {movie.Runtime}
              </p>
              <p className="mb-0">
                <span>⭐️</span> {movie.imdbRating} IMDb rating
              </p>
            </header>

            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating maxStars={10} onSetRating={setUserRating} />
                    {userRating > 0 && (
                      <button
                        className="bg-black text-white px-2 py-1 rounded-md mb-5"
                        onClick={handleAdd}
                      >
                        + Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p className="mb-3">
                    You rated with movie {watchedUserRating} <span>⭐️</span>
                  </p>
                )}
              </div>
              <p className="mb-2.5">
                <em>{movie.Plot}</em>
              </p>
              <p className="mb-2.5">Starring {movie.Actors}</p>
              <p className="mb-2.5">Directed by {movie.Director}</p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
