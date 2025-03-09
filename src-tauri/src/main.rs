// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod db;
mod models;
mod controllers;

use controllers::setting_controller::{fetch_settings, update_settings};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fetch_settings, update_settings])
        .run(tauri::generate_context!())
        .expect("Error while running Tauri application");
}
