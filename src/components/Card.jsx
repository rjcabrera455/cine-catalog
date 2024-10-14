function Card({ classes, children }) {
  return <div className={`shadow overflow-auto bg-white rounded p-2.5 ${classes}`}>{children}</div>;
}

export default Card;
