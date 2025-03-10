use mysql::*;
use mysql::prelude::*;

// Function to establish a database connection
pub fn get_connection() -> Result<PooledConn, String> {
    let url = "mysql://root:@localhost:3306/billing"; 
    let pool = Pool::new(url).map_err(|err| format!("Database connection failed: {}", err))?;
    pool.get_conn().map_err(|err| format!("Failed to get connection: {}", err))
}
