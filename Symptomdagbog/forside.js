
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


