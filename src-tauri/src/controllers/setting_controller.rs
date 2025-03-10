use mysql::prelude::*;
use mysql::params;
use crate::db::connection::get_connection;
use crate::models::setting::Setting;

#[tauri::command]
pub fn fetch_settings() -> Result<Vec<Setting>, String> {
    let mut conn = get_connection()?;
    let query = "SELECT sname, parameter FROM settings";
    
    conn.query_map(query, |(sname, parameter)| Setting { sname, parameter })
        .map_err(|err| format!("Query failed: {}", err))
}

#[tauri::command]
pub fn update_settings(settings: Vec<Setting>) -> Result<String, String> {
    let mut conn = get_connection()?;
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
