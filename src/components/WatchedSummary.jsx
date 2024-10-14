const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function WatchedSummary({ watched }) {
  const avgRating = average(watched.map((movie) => movie.imdbRating)).toFixed(
    2
  );
  const avgUserRating = average(
    watched.map((movie) => movie.UserRating)
  ).toFixed(2);
  const avgRuntime = average(watched.map((movie) => movie.Runtime));
  return (
    <div className="border p-2 rounded-md mb-2.5">
      <h1 className="font-bold uppercase mb-1">Movies You Watched</h1>
      <span>#️⃣ {watched.length} movies</span>
      <span className="ms-2">⭐ {avgRating}</span>
      <span className="ms-2">🌟 {avgUserRating}</span>
      <span className="ms-2">⌛ {avgRuntime}</span>
    </div>
  );
}

export default WatchedSummary;
