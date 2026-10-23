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