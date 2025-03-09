use mysql::*;
use mysql::prelude::*;


use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
struct Setting {
    sname: String,
    parameter: String,
}

#[tauri::command]
fn fetch_settings() -> Result<Vec<Setting>, String> {
    let url = "mysql://root:@localhost:3306/billing"; 

    let pool = Pool::new(url).map_err(|err| format!("Database connection failed: {}", err))?;
    let mut conn = pool.get_conn().map_err(|err| format!("Failed to get connection: {}", err))?;

    let query = "SELECT sname, parameter FROM settings";

    conn.query_map(query, |(sname, parameter)| Setting { sname, parameter })
        .map_err(|err| format!("Query failed: {}", err))
}

#[tauri::command]
fn update_settings(settings: Vec<Setting>) -> Result<String, String> {
    let url = "mysql://root:@localhost:3306/billing"; 

    let pool = Pool::new(url).map_err(|err| format!("Database connection failed: {}", err))?;
    let mut conn = pool.get_conn().map_err(|err| format!("Failed to get connection: {}", err))?;

    let query = "INSERT INTO settings (sname, parameter) VALUES (:sname, :parameter) 
                 ON DUPLICATE KEY UPDATE parameter = VALUES(parameter)";

    for setting in settings {
        conn.exec_drop(query, params! {
            "sname" => setting.sname,
            "parameter" => setting.parameter,
        }).map_err(|err| format!("Failed to update settings: {}", err))?;
    }

    Ok("Settings updated successfully".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fetch_settings, update_settings])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
