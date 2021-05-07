$(function () {
    var lastClick;
    var counter = 0;
    var listaRandom = [
        './images/cartas/card_diamond.png',
        './images/cartas/card_diamond.png',
        './images/cartas/card_heart.png',
        './images/cartas/card_heart.png',
        './images/cartas/card_moon.png',
        './images/cartas/card_moon.png',
        './images/cartas/card_square.png',
        './images/cartas/card_square.png',
    ];

    function shuffle (listaRandom) {
        var currentIndex = listaRandom.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = listaRandom[currentIndex];
            listaRandom[currentIndex] = listaRandom[randomIndex];
            listaRandom[randomIndex] = temporaryValue;
            }
            return listaRandom;
    }

    listaRandom = shuffle(listaRandom);

    $("img").click( async function () {
        counter = counter + 1;
        var actualClick = $(this);
        actualClick.addClass("clicked");
        if ($(".clicked").length === 2 && lastClick != null) {
            actualClick.attr("src", listaRandom[actualClick.attr("id")]);
            if (lastClick.attr("src") === actualClick.attr("src")) {
                lastClick.addClass("right");
                lastClick.removeClass("clicked");
                actualClick.addClass("right");
                actualClick.removeClass("clicked");
            } else {
                await setTimeout(function () {
                    lastClick.attr("src", "./images/cartas/card.png");
                    lastClick.removeClass("clicked");
                    actualClick.attr("src", "./images/cartas/card.png");
                    actualClick.removeClass("clicked");
                }, 300);
            }
        } else {
            actualClick.attr("src", listaRandom[$(this).attr("id")]);
            lastClick = actualClick;
        }
        if ($(".right").length === 8) {
            alert("Enhorabuena, has ganado !!\n" + "Pulsaciones: " + counter);
            $("img").removeClass("right");
            $("img").attr("src", "./images/cartas/card.png");
            counter = 0;
        }
    });
});