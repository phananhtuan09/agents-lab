import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error.message, info.componentStack ?? '');
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? <DefaultErrorFallback error={this.state.error} />
      );
    }
    return this.props.children;
  }
}

function DefaultErrorFallback({ error }: { error: Error | null }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-canvas p-6">
      <div className="max-w-md w-full bg-bg-surface border border-border-subtle rounded-card p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-brand-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-text-heading mb-2">
          Something went wrong
        </h2>
        <p className="text-text-muted text-sm mb-4">
          {error?.message ?? 'An unexpected error occurred.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary text-sm"
          type="button"
        >
          Reload
        </button>
      </div>
    </div>
  );
}
