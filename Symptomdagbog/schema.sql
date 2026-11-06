CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    cpr VARCHAR(10) NOT NULL UNIQUE,
    navn VARCHAR(200) NOT NULL
);

CREATE TABLE symptomregistreringer (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients(id),
    symptom VARCHAR(50) NOT NULL,
    severity INTEGER NOT NULL,
    dato TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Database-schema til vores symptomdagbog.
--Filen er kun dokumentation af de tabeller, vi har oprettet i Neon.
