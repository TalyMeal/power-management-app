// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use system_shutdown::shutdown;
use system_shutdown::reboot;
use system_shutdown::sleep;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn os_shutdown() {
    match shutdown() {
        Ok(_) => println!("Shutting down, bye!"),
        Err(error) => eprintln!("Failed to shut down: {}", error),
    }
}

#[tauri::command]
fn os_reboot() {
    match reboot() {
        Ok(_) => println!("Rebooting ..."),
        Err(error) => eprintln!("Failed to reboot: {}", error),
    }
}

#[tauri::command]
fn os_sleep() {
    match sleep() {
        Ok(_) => println!("Sleep ..."),
        Err(error) => eprintln!("Failed to sleep: {}", error),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, 
                                                 os_shutdown, 
                                                 os_reboot,
                                                 os_sleep])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
