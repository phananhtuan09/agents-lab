import { Card } from '@/features/app-shell/AppShell';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display font-semibold mb-2">
          Welcome to Agent Labs
        </h2>
        <p className="text-text-muted">
          Your local-first desktop workspace for AI agents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
          <p className="text-text-muted mb-4">
            View your agent activities and system status.
          </p>
          <button className="btn btn-primary w-full">
            View Dashboard
          </button>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold mb-2">Features</h3>
          <p className="text-text-muted mb-4">
            Manage and configure your agent features.
          </p>
          <button className="btn btn-secondary w-full">
            Manage Features
          </button>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold mb-2">Settings</h3>
          <p className="text-text-muted mb-4">
            Configure app preferences and theme settings.
          </p>
          <button className="btn btn-secondary w-full">
            Open Settings
          </button>
        </Card>
      </div>

      <Card>
        <div className="panel-header">
          <div>
            <h3 className="panel-title">System Status</h3>
            <p className="panel-subtitle">Local database and logging</p>
          </div>
          <span className="badge badge-primary">Active</span>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-muted">Database</span>
              <span className="text-success">Connected</span>
            </div>
            <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
              <div className="h-full w-full bg-success rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-muted">Logging</span>
              <span className="text-success">Enabled</span>
            </div>
            <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
              <div className="h-full w-full bg-success rounded-full"></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}