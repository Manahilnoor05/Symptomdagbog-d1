import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on("error", (err) => {
    console.error("Databasefejl:", err.message);
});

export async function hentPatienter() {
    const result = await pool.query(
        "SELECT id, cpr, navn FROM patients ORDER BY id"
    );

    return result.rows;
}