import { useAppStore } from '@/store/useAppStore';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, toggleSidebar } = useAppStore();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-bg-surface border-r border-border-subtle transition-transform duration-300 z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-display font-semibold mb-8">
            Agent Labs
          </h1>
          <nav className="space-y-2">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-brand-primary text-white font-medium">
              Dashboard
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-elevated transition-colors">
              Features
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-elevated transition-colors">
              Settings
            </button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-bg-surface/80 backdrop-blur-sm border-b border-border-subtle px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-bg-elevated transition-colors"
            >
              <svg
                className="w-6 h-6 text-text-main"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-bg-elevated transition-colors">
                <svg
                  className="w-6 h-6 text-text-main"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}