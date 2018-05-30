{   
    var $main,$listar,$login,$accesousuarios,$listarCarteles,$lunes,$martes,$miercoles,$jueves,$viernes,$extra,$modponencia,$moddatos,fRegAss,fRegPon,fModDat;
    $(function () {
        setTimeout(
            function(){
                $("#cartel").hide(400); 
                $("#pag_entera").show();
            }, 2000
        );
        $main=$('main');       
        $lunes=$('#lunes');
        $martes=$('#martes');
        $miercoles=$('#miercoles');
        $jueves=$('#jueves');
        $viernes=$('#viernes');
        $extra=$('#extra');
        $listar=$('#listar');
        $listarCarteles=$("#listacarteles");
        $login = $("#login").on("click", login);       
        $accesoUsuarios=$('#accesousuarios').on('click',accesousuarios);
        $('#tabs').tabs();
        $('#actividades').on('click',cargaActividades);
        $('#ponentes').on('click',cargarPonentes);
        $('#registroasistentes').on('click',registroAsistentes);
        $('#cartelespasados').on('click',carSys);
        $('#inicio').on('click',inicio);
        $fRegAss=$('.in').validacion();
        $fRegPon=$('.tin').validacion();
        $fModDat=$('.din').validacion();
        valfechas();
        $('#formulario').on('submit',function (e) {
            e.preventDefault();
            $fRegAss.validacionsubmit();
        })
        $('#formmoddatos').on('submit',function (e) {
            e.preventDefault();
            $fModDat.validacionsubmit();
        })
        $('#regpos').on('submit',function (e) {
            e.preventDefault();
            $fRegPon.validacionsubmit();
        })
    });
    let inicio= function(){
        location.reload();
    }
    let cargaActividades = function (){
        $lunes.html('<tr><td>Actividad</td><td>Ponentes</td><td>Procedencia</td><td>Hora</td></tr>');
        $martes.html('<tr><td>Actividad</td><td>Ponentes</td><td>Procedencia</td><td>Hora</td></tr>');
        $miercoles.html('<tr><td>Actividad</td><td>Ponentes</td><td>Procedencia</td><td>Hora</td></tr>');
        $jueves.html('<tr><td>Actividad</td><td>Ponentes</td><td>Procedencia</td><td>Hora</td></tr>');
        $viernes.html('<tr><td>Actividad</td><td>Ponentes</td><td>Procedencia</td><td>Hora</td></tr>');
        $extra.html('<tr><td>Actividad</td><td>Ponentes</td><td>Procedencia</td><td>Hora</td></tr>');
        ocultarTodo();
        $('#actividad').slideDown('slow')
            .show();
        $.getJSON({
            url:"json/programa.json",
            success:function(data){
                $.each(data, function (index, dia) {
                    $.each(dia, function (index2, actividad) {
                        $ponencia=$('<tr id="'+index+index2+'"><td><img src="'+actividad.foto+'" alt=""></td><td  colspan="3"><p>'+actividad.descripcion+'</p></td></tr>')
                            .hide();
                        actividades=$('<tr title="'+actividad.breve+'"></tr>')
                            .on('click',function(){
                                $('#'+index+index2).toggle(400);
                            })
                            .append($('<td></td>').html(actividad.nombreActividad))
                            .append($('<td></td>').html(actividad.nombrePonentes))
                            .append($('<td></td>').html(actividad.procedencia))
                            .append($('<td></td>').html(actividad.hora));
                        switch(index){
                            case 'Lunes':
                                $lunes.append(actividades)
                                    .append($ponencia);
                                break;
                            case 'Martes':
                                $martes.append(actividades)
                                    .append($ponencia);
                                break;
                            case 'Miercoles':
                                $miercoles.append(actividades)
                                    .append($ponencia);
                                break;
                            case 'Jueves':
                                $jueves.append(actividades)
                                    .append($ponencia);
                                break;
                            case 'Viernes':
                                $viernes.append(actividades)
                                    .append($ponencia);
                                break;
                            default:
                                $extra.append(actividades)
                                    .append($ponencia);
                                break;
                        }   
                    });
                });
            }
        });
    };

    let cargarPonentes = function () {
        ocultarTodo();
        $('#dponentes').slideDown('slow')
            .show();
        $listar.html('');
        $.getJSON({
            url:"json/programa.json",
            success:function(data){
                $.each(data,function(index, dia) {
                    $.each(dia,function (index2, actividad) {
                        $ponentes=$('<div></div>')
                            .append($('<img src="'+actividad.foto+'" alt="">'))
                            .append($('<h3></h3>').html(actividad.nombrePonentes));
                        $listar.append($ponentes);
                    });
                });
            }
        });
    }

    let registroAsistentes = function () {
        ocultarTodo();
        $('#regasistentes').slideDown('slow')
            .show();
    }

    let accesousuarios = function () {  
        ocultarTodo();
        $('#daccesousuarios').slideDown('slow')
            .show();
        $login.on('submit',login);
    }
    let ocultarTodo = function(){
        $main.children('div')
            .hide();
    }
    let login = function () {
        if ($("#usuario").val() === "dario" && $("#pass").val() === "dario"){
            $('#accesousuarios').parent().remove();
            $modponencia=$('<li><input type="button" id="ponencia" value="Registrar Ponencia"></a></li>')
                .on('click',registrarPonencia);
            $moddatos=$('<li><input type="button" id="datos" value="Modificar datos" ></li>')
                .on('click',modificarDatos);
            $cerrar=$('<li><input type="button" id="cerrarSession" value="Cerrar session" ></li>')
                .on('click',cerrarSession);
            $("nav>ul").append($modponencia)
                .append($moddatos)
                .append($cerrar);
            modificarDatos();
        }else $("#erLogin").html("El usuario o la contraseña no coinciden");
    };
    let cerrarSession = function(){
        ocultarTodo();
        $modponencia.remove();
        $moddatos.remove();
        $cerrar.remove();
        $accesousuarios=$('<li><input type="button" id="accesousuarios" value="Acceso"></li>')
            .on('click',accesousuarios)
            .click();
        $("nav>ul").append($accesousuarios);
    }
    let registrarPonencia = function () {
        ocultarTodo();
        $('#regPonencia').slideDown('slow')
            .show();
    };

    let modificarDatos = function () {
        ocultarTodo();
        $('#modDatos').slideDown('slow')
            .show();
    };

    let carSys = function () {       
        ocultarTodo();
        $('#carteles').slideDown('slow')
            .show();
        $listarCarteles.html("");
        $.getJSON({
            url:"json/sysmanas.json",
            success:function(data){
                $.each(data,function (indice, sysmana) {
                    $cartel=$('<div></div>')
                        .append($('<h3>'+sysmana.nombre+'</h3>'))
                        .append($('<img class="fotoCartel" src="'+sysmana.foto+'" alt="">'));
                       $listarCarteles.append($cartel);
                       insertarSysmanas(data);
                });
                
            }
        });
    };
    $.fn.validacion = function(options) {
        let opts = $.extend(true, $.fn.validacion.defaults, options);
        this.each(function() {           
        }).on('blur',function(event) {
            let $this = $(this);
            selector=$this.attr('class').substr($this.attr('class').indexOf(' '));
            regex=$this.attr('class').replace(selector,"");
            error="Rerr"+$this.attr('id');
            if(opts[regex].test($this.val())) {
                $this.css('border','1px solid #2ECC40');
                $('#'+error).text('');   
            }else{
                $('#'+error).text('Error');
                $this.css('border','1px solid #FF4136');    
            }
        });
        return this;
    };
    $.fn.validacion.defaults = {
        'nombre':/[a-zA-Z]{3,}/,
        'apellido':/[a-zA-Z]{3,} [a-zA-Z]{3,}/,
        'dni':/^(\d{8})[- ]?([a-z])$/i,
        'email':/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/, 
        'imagen':/.*\.png/, 
        'texto':/[\w\d]{3,},?/g, 
        'numero':/[1-9]+/
    };
    $.fn.validacionsubmit = function(options) {
        let opts = $.extend(true, $.fn.validacion.defaults, options);
        this.each(function() {     
            let $this = $(this);
            selector=$this.attr('class').substr($this.attr('class').indexOf(' '));
            regex=$this.attr('class').replace(selector,"");
            error="Rerr"+$this.attr('id');
            if(opts[regex].test($this.val())) {
                $this.css('border','1px solid #2ECC40');
                $('#'+error).text('');   
            }else{
                $('#'+error).text('Error');
                $this.css('border','1px solid #FF4136');    
            }       
        });
        return this;
    };
    // default options
    let valfechas = function(){
        $.datepicker.regional['es'] = {
            closeText: 'Cerrar',
            prevText: '<Ant',
            nextText: 'Sig>',
            currentText: 'Hoy',
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
            dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
            weekHeader: 'Sm',
            dateFormat: 'dd/mm/yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional['es']);
        let dateFormat = "dd-mm-yy",
            from = $("#dayspref")
                .datepicker({
                      defaultDate: "+1w",
                      changeMonth: true,
                      showAnim: "drop",
                      dateFormat: "dd-mm-yy",
                      minDate: new Date("January 29, 2018"),
                      maxDate: new Date("February 02, 2018")
                }).prop("readonly", "true")
                .on("change", function () {
                    to.datepicker("option", "minDate", getDate(this));
                }),
            to = $("#daysprefend").datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                showAnim: "drop",
                dateFormat: "dd-mm-yy",
                minDate: new Date("January 29, 2018"),
                maxDate: new Date("February 02, 2018")
            }).prop("readonly", "true")
                .on("change", function () {
                    from.datepicker("option", "maxDate", getDate(this));
                });
        function getDate(element) {
            let date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }
            return date;
        };
    }
    let mostrarSismanas = function(){   
   $('main').children().hide();
   $('#AllSysmanas').show('faster');
      $.getJSON("../json/sysmanas.json")
         .done(insertarSysmanas);
    }

let insertarSysmanas = function (data) {
    $(".fotoCartel").on("click", function () {
        $("#modalCarrusel").remove();
        $("main").append("<div id='modalCarrusel'></div>");
        $("#modalCarrusel").append("<div id='carrusel'></div>");
        $.each(data, function (indice, actividad) {
            $("#carrusel").append("<div><img src='" + actividad.foto + "' alt=''></div>");
        });
        $("#carrusel").slick({
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1
        });
        $("#modalCarrusel").dialog({
            modal: true,
            resizable: false,
            draggable: false,
            width: 500,
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "slideUp",
                duration: 1000
            }
        });
    });
};
}
