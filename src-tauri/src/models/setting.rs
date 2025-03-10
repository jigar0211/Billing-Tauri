use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Setting {
    pub sname: String,
    pub parameter: String,
}
