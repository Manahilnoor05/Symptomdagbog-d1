async function hentHistorik() {
    const response = await fetch("/api/registreringer");

    if (!response.ok) {
        alert("Historikken kunne ikke hentes.");
        return;
    }

    const registreringer = await response.json();

    const liste = document.getElementById("historik-liste");

    liste.innerHTML = "";

    registreringer.forEach(function(registrering) {
        const kort = document.createElement("div");

        kort.classList.add("registrering");

        const dato = new Date(
            registrering.dato
        ).toLocaleDateString("da-DK");

        kort.innerHTML = `
            <h3>${registrering.symptom}</h3>
            <p>Sværhedsgrad: ${registrering.severity}/5</p>
            <p>Dato: ${dato}</p>
        `;

        liste.appendChild(kort);
    });
}

hentHistorik();