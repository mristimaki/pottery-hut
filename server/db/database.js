import Database from "better-sqlite3";

const db = new Database('pottery-hut.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    sku TEXT NOT NULL,
    brand TEXT,
    image_url TEXT NOT NULL,
    price REAL NOT NULL,
    published_date TEXT NOT NULL
    )
`);

export default db;
