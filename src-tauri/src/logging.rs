use std::fs::OpenOptions;
use std::io::Write;
use std::path::PathBuf;
use std::sync::Mutex;

pub struct Logger {
    log_file: Mutex<Option<PathBuf>>,
}

impl Logger {
    pub fn new() -> Self {
        Self {
            log_file: Mutex::new(None),
        }
    }

    pub fn init(&self, log_path: &str) -> std::io::Result<()> {
        let path = PathBuf::from(log_path);
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent)?;
        }
        *self.log_file.lock().unwrap() = Some(path);
        Ok(())
    }

    pub fn log(&self, level: &str, message: &str) {
        let timestamp = chrono::Utc::now().format("%Y-%m-%d %H:%M:%S%.3f");
        let log_entry = format!("[{}] [{}] {}\n", timestamp, level, message);

        if let Some(log_path) = self.log_file.lock().unwrap().as_ref() {
            if let Ok(mut file) = OpenOptions::new()
                .create(true)
                .append(true)
                .open(log_path)
            {
                let _ = file.write_all(log_entry.as_bytes());
            }
        }
    }
}

impl Default for Logger {
    fn default() -> Self {
        Self::new()
    }
}