import { useState } from 'react';
import Star from './Star';

function StarRating({ onSetRating }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }
  return (
    <div className="mb-2.5 flex items-center gap-2.5">
      <div>
        {Array.from({ length: 10 }).map((_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
          />
        ))}
      </div>
      <span className="text-xl text-yellow-500">
        {tempRating || rating || ''}
      </span>
    </div>
  );
}

export default StarRating;
