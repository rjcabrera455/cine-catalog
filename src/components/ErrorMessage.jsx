function ErrorMessage({ error }) {
  return (
    <p className="text-center m-10">
      <span>⛔️</span> {error}
    </p>
  );
}

export default ErrorMessage;
