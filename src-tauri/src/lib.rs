use mongodb::{bson::{doc, to_document}, options::ClientOptions, Client, Collection};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::Mutex;
use tauri::State;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Settings {
   companyname: String,
    companygstno: String,
    companypan: String,
    company: String,
    year: String,
    invnum: String,
    hsn: String,
    igst: String,
    sgst: String,
    cgst: String,
    paymenterms: String,
    address: String,
    bankmicr: String,
    bankifsc: String,
    bankbranch: String,
    bankaccno: String,
    bankname: String,
    username: String,
}

struct Database {
    client: Client,
}

impl Database {
    async fn new() -> Self {
        let client_uri = "mongodb://127.0.0.1:27017"; // Local MongoDB URI
        let options = ClientOptions::parse(client_uri).await.expect("Failed to parse MongoDB URI");
        let client = Client::with_options(options).expect("Failed to connect to MongoDB");

        println!("✅ MongoDB connected!");
        Self { client }
    }

    async fn check_connection(&self) -> bool {
        self.client.database("billing").run_command(doc! {"ping": 1}, None).await.is_ok()
    }

    async fn get_settings(&self) -> Option<Settings> {
        let db = self.client.database("billing");
        let collection: Collection<Settings> = db.collection("settings");

        collection.find_one(None, None).await.ok().flatten()
    }

    async fn update_settings(&self, settings: Settings) -> bool {
        let db = self.client.database("billing");
        let collection: Collection<Settings> = db.collection("settings");

        let filter = doc! {}; // Empty filter to update the first document or insert new one
        let update = doc! { "$set": to_document(&settings).unwrap() };

        match collection.update_one(filter, update, mongodb::options::UpdateOptions::builder().upsert(true).build()).await {
            Ok(_) => true,
            Err(_) => false,
        }
    }
}

#[tauri::command]
async fn check_database(state: State<'_, Arc<Mutex<Database>>>) -> Result<String, String> {
    let db = state.lock().await;
    if db.check_connection().await {
        Ok("✅ Database Connected".to_string())
    } else {
        Err("❌ Database Not Connected".to_string())
    }
}
#[tauri::command]
async fn get_settings(state: State<'_, Arc<Mutex<Database>>>) -> Result<Option<Settings>, String> {
    let db = state.lock().await;
    match db.get_settings().await {
        Some(settings) => {
            println!("✅ Settings found: {:?}", settings);
            Ok(Some(settings))
        }
        None => {
            println!("❌ No settings found in DB!");
            Err("❌ No settings found".to_string())
        }
    }
}

#[tauri::command]
async fn update_settings(state: State<'_, Arc<Mutex<Database>>>, settings: Settings) -> Result<String, String> {
    let db = state.lock().await;
    if db.update_settings(settings).await {
        Ok("✅ Settings updated successfully".to_string())
    } else {
        Err("❌ Failed to update settings".to_string())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(Arc::new(Mutex::new(tokio::runtime::Runtime::new().unwrap().block_on(Database::new()))))
        .invoke_handler(tauri::generate_handler![check_database, get_settings, update_settings])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
