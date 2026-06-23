#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;
use tauri::Manager;

mod db;
mod logging;

struct AppState {
    db: Mutex<rusqlite::Connection>,
    logger: logging::Logger,
}

fn main() {
    env_logger::init();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            log_message,
            settings_get,
            settings_set,
        ])
        .setup(|app| {
            let app_data_dir = app
                .path()
                .app_data_dir()
                .expect("Failed to get app data directory");
            std::fs::create_dir_all(&app_data_dir).expect("Failed to create app data directory");

            let db_path = app_data_dir.join("agent-labs.db");
            let db = rusqlite::Connection::open(&db_path).expect("Failed to open database");

            db.execute_batch("PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;")
                .expect("Failed to set database pragmas");

            let mut migration_runner = db::migrations::Runner::new();
            migration_runner.register(Box::new(db::migrations::V1CreateSettings));
            migration_runner.run(&db).expect("Migrations failed");

            let logger = logging::Logger::new();
            let log_path = app
                .path()
                .app_log_dir()
                .expect("Failed to get log directory")
                .join("agent-labs.log");
            logger
                .init(log_path.to_str().unwrap())
                .expect("Failed to initialize logger");

            logger.log("INFO", "Application started");

            app.manage(AppState {
                db: Mutex::new(db),
                logger,
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn log_message(
    level: String,
    message: String,
    state: tauri::State<'_, AppState>,
) -> Result<(), String> {
    state.logger.log(&level, &message);
    Ok(())
}

#[tauri::command]
fn settings_get(key: String, state: tauri::State<'_, AppState>) -> Result<Option<String>, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    let result = db.query_row(
        "SELECT value FROM settings WHERE key = ?1",
        rusqlite::params![key],
        |row| row.get(0),
    );
    match result {
        Ok(value) => Ok(Some(value)),
        Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
fn settings_set(
    key: String,
    value: String,
    state: tauri::State<'_, AppState>,
) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.execute(
        "INSERT INTO settings (key, value) VALUES (?1, ?2)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value",
        rusqlite::params![key, value],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}
