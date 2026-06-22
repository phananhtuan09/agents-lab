import { AppShell } from '@/features/app-shell/AppShell'
import { Dashboard } from '@/features/dashboard/Dashboard'

function App() {
  return (
    <AppShell>
      <Dashboard />
    </AppShell>
  )
}

export default App