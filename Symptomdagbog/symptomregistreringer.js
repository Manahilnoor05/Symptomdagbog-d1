import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export async function opretRegistrering(patientId, symptom, severity) {
    const result = await pool.query(
        `INSERT INTO symptomregistreringer
        (patient_id, symptom, severity)
        VALUES ($1, $2, $3)
        RETURNING id, patient_id, symptom, severity, dato`,
        [patientId, symptom, severity]
    );

    return result.rows[0];
}