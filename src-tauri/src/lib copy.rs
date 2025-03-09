use tauri_plugin_sql::{Migration, MigrationKind};  

#[tauri::command]  
fn greet(name: &str) -> String {  
    format!("Hello, {}! You've been greeted from Rust!", name)  
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]  
pub fn run() {  
    let migrations = vec![  
        Migration {  
            version: 1,  
            description: "create settings table",  
            sql: "CREATE TABLE IF NOT EXISTS settings (  
                sname TEXT PRIMARY KEY,  
                parameter TEXT NOT NULL  
            )",  
            kind: MigrationKind::Up,  
        },
        Migration {
            version: 2,
            description: "create core tables",
            sql: "
                PRAGMA foreign_keys = ON;

                CREATE TABLE IF NOT EXISTS customers (
                    id INTEGER PRIMARY KEY,
                    customer_name TEXT NOT NULL,
                    address TEXT NOT NULL,
                    mobile_no TEXT NOT NULL,
                    customer_gst TEXT NOT NULL UNIQUE
                );

                CREATE TABLE IF NOT EXISTS invoices (
                    id INTEGER PRIMARY KEY,
                    customer_id INTEGER NOT NULL,
                    payment_by TEXT,
                    invoice_number TEXT NOT NULL UNIQUE,
                    invoice_date TEXT NOT NULL,
                    buyers_ord_no TEXT,
                    buyers_ord_date TEXT,
                    dispatch_through TEXT,
                    dispatch_date TEXT,
                    payment_term TEXT,
                    payment_detail TEXT,
                    FOREIGN KEY (customer_id) REFERENCES customers(id)
                );

                CREATE TABLE IF NOT EXISTS other_details (
                    id INTEGER PRIMARY KEY,
                    item_name TEXT NOT NULL UNIQUE
                );

                CREATE TABLE IF NOT EXISTS invoice_items (
                    id INTEGER PRIMARY KEY,
                    invoice_id INTEGER NOT NULL,
                    item_name TEXT NOT NULL,
                    hsn_code TEXT NOT NULL,
                    item_type TEXT,
                    quantity INTEGER NOT NULL,
                    net_weight REAL,
                    purity_weight REAL,
                    rate REAL NOT NULL,
                    igst REAL DEFAULT 0,
                    cgst REAL DEFAULT 0,
                    sgst REAL DEFAULT 0,
                    other_item_id INTEGER,
                    other_item_weight REAL,
                    other_item_amount REAL,
                    total_purity_weight REAL GENERATED ALWAYS AS (purity_weight * quantity) VIRTUAL,
                    status TEXT DEFAULT 'active',
                    last_updated TEXT DEFAULT CURRENT_TIMESTAMP,
                    labour_charge REAL DEFAULT 0,
                    roundoff REAL DEFAULT 0,
                    net_total REAL NOT NULL,
                    is_deleted INTEGER DEFAULT 0,
                    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
                    FOREIGN KEY (other_item_id) REFERENCES other_details(id)
                );

                CREATE INDEX idx_invoice_items_invoice_id ON invoice_items(invoice_id);
                CREATE INDEX idx_invoices_customer_id ON invoices(customer_id);
            ",
            kind: MigrationKind::Up,
        }
    ];  

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:billing.db", migrations)
                .build()
        )
        .plugin(tauri_plugin_shell::init())  
        .invoke_handler(tauri::generate_handler![greet])  
        .run(tauri::generate_context!())  
        .expect("error while running Tauri application");  
}