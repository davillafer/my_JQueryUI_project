$(function() {

    let first_condition;
    let second_condition;

    $("#show-result").hide();
    $("#enviar").hide();

    $("#enviar").click(function () {
        $("#show-result").show();
        if(first_condition && second_condition) {
            $("#show-result").html('<p>Correcto</p>');
        } else {
            $("#show-result").html('<p>Incorrecto</p>');
        }
    });

    $("#datepicker").datepicker({
        showAnim : "slide",
        dateFormat : "dd/mm/yy"
    });

    $("#generar").click(function(){
        $("#enviar").show();
        let date_default = $('#datepicker').datepicker('getDate');
        let date = new Date(Date.parse(date_default));
        let newDate;
        var aux = "";
        for (let i = 1; i <= 7; i++){
            aux="";
            date.setDate( date.getDate() + 1 );
            newDate = date.toDateString();
            newDate = new Date( Date.parse( newDate ) ).toJSON().substring(0,10);
            aux += "<h2>" + newDate + "</h2><ol class='selectable' id='selectable_" + i + "'>";
            aux += "<li class='ui-widget-content'>Mañana</li>";
            aux += "<li class='ui-widget-content'>Tarde</li><li class='ui-widget-content'>Noche</li></ol>";
            $("#contenedor").append(aux);
        }
        $("#contenedor").selectable({
            filter: 'li',
            selected: function (event, ui) {
                var all_rows = [];
                for (let i = 1; i <= 3; i++) {
                    all_rows.push($("#selectable_" + i).find('.ui-selected').length);
                }
                var num_selected = $(".selectable").find('.ui-selected').length;
                first_condition = true;
                second_condition = num_selected > 3;
                $.each(all_rows, (index, value) => {
                    if(value == 1){
                        first_condition = false;
                    }
                });
            },
            unselected: function (event, ui) {
                var all_rows = [];
                for (let i = 1; i <= 3; i++) {
                    all_rows.push($("#selectable_" + i).find('.ui-selected').length);
                }
                var num_selected = $(".selectable").find('.ui-selected').length;
                first_condition = true;
                second_condition = num_selected > 3;
                $.each(all_rows, (index, value) => {
                    if(value == 1){
                        first_condition = false;
                    }
                });
            }
        });
    });


});



