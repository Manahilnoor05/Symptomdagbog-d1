import express from "express";
import cors from "cors";

import { hentPatienter } from "./patients.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/patients", async (req, res) => {
    try {
        const patients = await hentPatienter();
        res.status(200).json(patients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Databasefejl" });
    }
});

app.listen(3000, () => {
    console.log("Serveren kører på http://localhost:3000");
});