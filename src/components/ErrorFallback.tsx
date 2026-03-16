export function ErrorFallback({ message }: { message: string }) {
  return (
    <div className="error-fallback">
      <h2>Render error</h2>
      <pre className="error-fallback__message">{message}</pre>
    </div>
  );
}
