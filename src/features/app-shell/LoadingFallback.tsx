export function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-canvas">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-muted text-sm">Loading...</p>
      </div>
    </div>
  );
}
