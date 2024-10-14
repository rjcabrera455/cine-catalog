function Star({ onRate, onHoverIn, onHoverOut, full }) {
  return (
    <span
      role="button"
      className="text-2xl text-yellow-500 cursor-pointer"
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? '★' : '☆'}
    </span>
  );
}

export default Star;
