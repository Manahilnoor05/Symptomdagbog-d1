// -----------------------
// ÉN SAMLET TILSTAND
// -----------------------

let state = {

    valgtSymptom: "",

    valgtRating: 0,

    registreringer:
        JSON.parse(
            localStorage.getItem("registreringer")
        ) || []

};


// -----------------------
// LOGIN
// -----------------------

document
    .getElementById("login-form")
    .addEventListener("submit", function(event) {

        // Stopper formularen fra at reloade siden
        event.preventDefault();

        visForside();

    });


// -----------------------
// NAVIGATION
// -----------------------

function skjulAlleSider() {

    const sider =
        document.querySelectorAll(".side");


    sider.forEach(function(side) {

        side.classList.add("skjult");

    });

}


function visForside() {

    skjulAlleSider();


    document
        .getElementById("forside")
        .classList.remove("skjult");

}


function visRegistrering() {

    skjulAlleSider();


    document
        .getElementById("registrering-side")
        .classList.remove("skjult");


    tegnHistorik();

}


function visHistorik() {

    skjulAlleSider();


    document
        .getElementById("historik-side")
        .classList.remove("skjult");


    tegnHistorik();

}


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

function gemRegistrering() {

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


    // Tilføj til state

    state.registreringer.push(
        registrering
    );


    // Gem state-data i browseren

    localStorage.setItem(

        "registreringer",

        JSON.stringify(
            state.registreringer
        )

    );


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


// -----------------------
// TEGN HISTORIK
// -----------------------

function tegnHistorik() {

    const historik =
        document.getElementById(
            "historik-liste"
        );


    const kortHistorik =
        document.getElementById(
            "kort-historik"
        );


    historik.innerHTML = "";

    kortHistorik.innerHTML = "";


    if (
        state.registreringer.length === 0
    ) {

        historik.innerHTML =
            "<p>Du har endnu ingen registreringer.</p>";


        kortHistorik.innerHTML =
            "<p>Ingen registreringer endnu.</p>";


        return;

    }


    state.registreringer
        .forEach(function(registrering) {


            const element =
                document.createElement(
                    "div"
                );


            element.classList.add(
                "registrering"
            );


            element.innerHTML =

                "<strong>" +
                registrering.symptom +
                "</strong>" +

                "<br>" +

                "Sværhedsgrad: " +
                registrering.rating +
                "/5" +

                "<br>" +

                "Dato: " +
                registrering.dato;


            historik.appendChild(
                element
            );

        });


    // Vis kun de tre seneste
    // i sidepanelet

    const seneste =
        state.registreringer.slice(-3);


    seneste.forEach(
        function(registrering) {


            const element =
                document.createElement(
                    "div"
                );


            element.classList.add(
                "registrering"
            );


            element.innerHTML =

                "<strong>" +
                registrering.symptom +
                "</strong>" +

                "<br>" +

                registrering.rating +
                "/5" +

                "<br>" +

                registrering.dato;


            kortHistorik.appendChild(
                element
            );

        }
    );

}


// -----------------------
// TEGN DATA VED START
// -----------------------

tegnHistorik();