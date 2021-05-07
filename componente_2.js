$(function () {
    let pos;
    let preguntas;
    let words;

    if (typeof (Storage) !== "undefined") {
        if (localStorage.pos) {
            pos = localStorage.pos;
        } else {
            pos = 0;
        }
        if (localStorage.words) {
            words = JSON.parse(localStorage.words);
        } else {
            words = [
                '<li id="0" class="word draggable">the last chapter</li>',
                '<li id="1" class="word draggable">the house</li>',
                '<li id="2" class="word draggable">the wedding</li>',
                '<li id="3" class="word draggable">her driving test</li>',
                '<li id="4" class="word draggable">* intransitive</li>',
                '<li id="5" class="word draggable">the concert</li>',
                '<li id="6" class="word draggable">* intransitive</li>',
                '<li id="7" class="word draggable">his own bread</li>',
                '<li id="8" class="word draggable">the door</li>',
                '<li id="9" class="word draggable">* intransitive</li>',
            ];
        }
    }

    preguntas = [
        '<div>1. He makes<ul class="answer"></ul></div>',
        '<div>2. I loved<ul class="answer"></ul>of the book</div>',
        '<div>3. Open<ul class="answer"></ul></div>',
        '<div>4. She failed<ul class="answer"></ul></div>',
        '<div>5. will we go to<ul class="answer"></ul>?</div>',
        '<div>6. <ul class="answer"></ul>has lots of light</div>',
        '<div>7. That band did it great at<ul class="answer"></ul></div>'
    ];

    function saveused(id) {
        var a = words[id];
        var b = " usado ";
        var position = 18;
        var output = [a.slice(0, position), b, a.slice(position)].join('');
        words[id] = output;
        localStorage.words = JSON.stringify(words);
    }

    $("#answers").html(preguntas[pos]);

    for (let i = 0; i < words.length; i++) {
        $("#words").append(words[i]);
    }

    $("#clear").click(function clear() {
        localStorage.clear();
        location.reload();
    });

    function show(position) {
        $("#answers").html(preguntas[position]);
        savePos();
        location.reload();
    }

    decreaseCounter();

    function savePos() {
        if (typeof (Storage) !== "undefined") {
            if (localStorage.pos) {
                localStorage.pos = pos;
            } else {
                localStorage.pos = 0;
            }
        }
    }

    $("#next").click(function () {
        pos++;
        if (pos === preguntas.length) {
            alert("Has finalizado el ejercicio!");
            localStorage.clear();
        }
        show(pos);
    });

    $(".draggable").draggable({
        revert: 'invalid'
    });

    $(".answer").droppable({
        // Solo acepta el elemento con la id:  #draggable
        accept: ".draggable",
        activeClass: "ui-sate-default",
        hover: "ui-state-hover",
        drop: function (event, ui) {
            $(this).addClass("ui-state-highlight");
            ui.draggable.addClass('usado');
            saveused(ui.draggable.attr("id"));
            decreaseCounter();
        }
    });

    function decreaseCounter() {
        $("#counter").html($("#words li").length - $(".usado").length);
    }
});