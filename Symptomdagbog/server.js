import express from "express";
import cors from "cors";
import { opretRegistrering } from "./symptomregistreringer.js";
import { hentPatienter } from "./patients.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/patients", async (req, res) => {
    try {
        const patients = await hentPatienter();
        res.status(200).json(patients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Databasefejl" });
    }
});

app.post("/api/registreringer", async (req, res) => {
    const { patient_id, symptom, severity } = req.body ?? {};

    if (!patient_id || !symptom || !severity) {
        return res.status(400).json({
            error: "patient, symptom og sværhedsgrad skal med"
        });
    }

    try {
        const registrering = await opretRegistrering(
            patient_id,
            symptom,
            severity
        );

        res.status(201).json(registrering);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "serverfejl"
        });
    }
});

app.listen(3000, () => {
    console.log("Serveren kører på http://localhost:3000");
});