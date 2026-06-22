use rusqlite::Connection;

const MIGRATIONS_TABLE: &str = "CREATE TABLE IF NOT EXISTS _migrations (
    version INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
)";

pub trait Migration {
    fn version(&self) -> u64;
    fn name(&self) -> &str;
    fn sql(&self) -> &str;
}

pub struct Runner {
    migrations: Vec<Box<dyn Migration>>,
}

impl Runner {
    pub fn new() -> Self {
        Runner {
            migrations: Vec::new(),
        }
    }

    pub fn register(&mut self, migration: Box<dyn Migration>) {
        self.migrations.push(migration);
    }

    pub fn run(&self, conn: &Connection) -> Result<(), String> {
        conn.execute(MIGRATIONS_TABLE, [])
            .map_err(|e| format!("Failed to create migrations table: {}", e))?;

        let current_version: u64 = conn
            .query_row(
                "SELECT COALESCE(MAX(version), 0) FROM _migrations",
                [],
                |row| row.get(0),
            )
            .map_err(|e| format!("Failed to read current migration version: {}", e))?;

        let mut pending: Vec<&Box<dyn Migration>> = self
            .migrations
            .iter()
            .filter(|m| m.version() > current_version)
            .collect();
        pending.sort_by_key(|m| m.version());

        for migration in &pending {
            let tx = conn
                .unchecked_transaction()
                .map_err(|e| format!("Failed to start migration transaction: {}", e))?;

            tx.execute_batch(migration.sql())
                .map_err(|e| {
                    format!(
                        "Migration V{} '{}' failed: {}",
                        migration.version(),
                        migration.name(),
                        e
                    )
                })?;

            tx.execute(
                "INSERT INTO _migrations (version, name) VALUES (?1, ?2)",
                rusqlite::params![migration.version(), migration.name()],
            )
            .map_err(|e| format!("Failed to record migration V{}: {}", migration.version(), e))?;

            tx.commit().map_err(|e| {
                format!(
                    "Failed to commit migration V{}: {}",
                    migration.version(),
                    e
                )
            })?;
        }

        Ok(())
    }
}

pub struct V1CreateSettings;

impl Migration for V1CreateSettings {
    fn version(&self) -> u64 {
        1
    }

    fn name(&self) -> &str {
        "create_settings_table"
    }

    fn sql(&self) -> &str {
        "CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )"
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_migration_applies() {
        let conn = Connection::open_in_memory().unwrap();
        let mut runner = Runner::new();
        runner.register(Box::new(V1CreateSettings));
        assert!(runner.run(&conn).is_ok());

        let count: u64 = conn
            .query_row("SELECT COUNT(*) FROM _migrations", [], |row| row.get(0))
            .unwrap();
        assert_eq!(count, 1);

        conn.execute("INSERT INTO settings (key, value) VALUES ('theme', 'dark')", [])
            .unwrap();
        let value: String = conn
            .query_row(
                "SELECT value FROM settings WHERE key = 'theme'",
                [],
                |row| row.get(0),
            )
            .unwrap();
        assert_eq!(value, "dark");
    }

    #[test]
    fn test_migration_idempotent() {
        let conn = Connection::open_in_memory().unwrap();
        let mut runner = Runner::new();
        runner.register(Box::new(V1CreateSettings));

        assert!(runner.run(&conn).is_ok());
        assert!(runner.run(&conn).is_ok());

        let count: u64 = conn
            .query_row("SELECT COUNT(*) FROM _migrations", [], |row| row.get(0))
            .unwrap();
        assert_eq!(count, 1);
    }
}
