// -----------------------
// ÉN SAMLET TILSTAND
// -----------------------

let state = {

    valgtSymptom: "",

    valgtRating: 0,

    registreringer: []

};

// -----------------------
// VÆLG SYMPTOM
// -----------------------

function vaelgSymptom(symptom, knap) {

    state.valgtSymptom = symptom;


    const knapper =
        document.querySelectorAll(
            ".symptom-knap"
        );


    knapper.forEach(function(button) {

        button.classList.remove("valgt");

    });


    knap.classList.add("valgt");


    opdaterValgTekst();

}


// -----------------------
// VÆLG RATING
// -----------------------

function vaelgRating(rating, knap) {

    state.valgtRating = rating;


    const knapper =
        document.querySelectorAll(
            ".rating button"
        );


    knapper.forEach(function(button) {

        button.classList.remove("valgt");

    });


    knap.classList.add("valgt");


    opdaterValgTekst();

}
// -----------------------
// VIS VALG
// -----------------------

function opdaterValgTekst() {

    const tekst =
        document.getElementById(
            "valg-tekst"
        );


    if (
        state.valgtSymptom &&
        state.valgtRating
    ) {

        tekst.textContent =
            state.valgtSymptom +
            " – sværhedsgrad " +
            state.valgtRating +
            "/5";

    }

}
// -----------------------
// GEM REGISTRERING
// -----------------------

async function gemRegistrering() {

    if (
        !state.valgtSymptom ||
        !state.valgtRating
    ) {

        alert(
            "Vælg både symptom og sværhedsgrad."
        );

        return;

    }


    const registrering = {

        symptom:
            state.valgtSymptom,

        rating:
         state.valgtRating,

        dato:
            new Date()
                .toLocaleDateString("da-DK")

    };


  

const response = await fetch("/api/registreringer", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        patient_id: 1,
        symptom: state.valgtSymptom,
        severity: state.valgtRating
    })
});

if (!response.ok) {
    alert("Registreringen kunne ikke gemmes.");
    return;
}

alert("Registreringen er gemt.");


    // Nulstil valg

    state.valgtSymptom = "";

    state.valgtRating = 0;


    nulstilKnapper();
 // Når listen ændres,
    // tegnes historikken igen

    tegnHistorik();


    alert(
        "Registreringen er gemt."
    );

}


// -----------------------
// NULSTIL KNAPPER
// -----------------------

function nulstilKnapper() {

    const valgte =
        document.querySelectorAll(
            ".valgt"
        );
        valgte.forEach(function(element) {

        element.classList.remove("valgt");

    });


    document
        .getElementById("valg-tekst")
        .textContent =
        "Vælg et symptom og en sværhedsgrad.";

} 


