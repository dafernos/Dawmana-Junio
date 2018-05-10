{
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
        $login = $("#login").on("click", login);       
        $accesoUsuarios=$('#accesousuarios').on('click',accesousuarios);
        $('#tabs').tabs();
        $('#actividades').on('click',cargaActividades);
        $('#ponentes').on('click',cargarPonentes);
        $('#registroasistentes').on('click',registroAsistentes);
        $('#cartelespasados').on('click',carSys);
    });

    let cargaActividades = function (e){
        $lunes.html('<tr><td>Actividad</td><td>Ponentes</td><td>Procedencia</td><td>Hora</td></tr>');
        $martes.html('<tr><td>Actividad</td><td>Ponentes</td><td>Procedencia</td><td>Hora</td></tr>');
        $miercoles.html('<tr><td>Actividad</td><td>Ponentes</td><td>Procedencia</td><td>Hora</td></tr>');
        $jueves.html('<tr><td>Actividad</td><td>Ponentes</td><td>Procedencia</td><td>Hora</td></tr>');
        $viernes.html('<tr><td>Actividad</td><td>Ponentes</td><td>Procedencia</td><td>Hora</td></tr>');
        $extra.html('<tr><td>Actividad</td><td>Ponentes</td><td>Procedencia</td><td>Hora</td></tr>');
        $main.children('div')
            .hide();
        $('#actividad').show();
        
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

    let cargarPonentes = function (e) {
        $main.children('div')
            .hide();
        $('#dponentes').show();
        $listar.html('');
        $.getJSON({
            url:"json/programa.json",
            success:function(data){
                $.each(data,function(index, dia) {
                    $.each(dia,function (index2, actividad) {
                        ponentes=$('<div></div>')
                            .append($('<img src="'+actividad.foto+'" alt="">'))
                            .append($('<h3></h3>').html(actividad.nombrePonentes));
                        $listar.append(ponentes);
                    });
                });
            }
        });
    }

    let registroAsistentes = function (e) {
        $main.children('div').hide();
        $('#regasistentes').show();
    }

    let accesousuarios = function (e) {  
        $main.children('div').hide();
        $('#daccesousuarios').show();
        $login.on('submit',login);
    }

    let login = function (e) {
        e.preventDefault();
        if ($("#usuario").val() === "dario" && $("#pass").val() === "dario"){
            $main.children('div')
                .hide();
            $accesoUsuarios.parent()
                .remove();
            $ponencia=$('<li><input type="button" id="ponencia" value="Registrar Ponencia"></a></li>')
                .on('click',registrarPonencia);
            $datos=$('<li><input type="button" id="datos" value="Modificar datos" ></li>')
                .on('click',modificarDatos);
            $("nav>ul").append($ponencia)
                .append($datos);
            modificarDatos();
        }else $("#errorLogin").html("El usuario o la contraseña no coinciden");
    };

    let registrarPonencia = function (e) {
        $main.children('div')
            .hide();
    };

    let modificarDatos = function (e) {
        $main.children('div')
            .hide();
        $('#modDatos').show();
    };

    let carSys = function (e) {       
        $main.children('div').hide();
        $('#carteles').show();
        $("#listacarteles").html("");
        $.getJSON({
            url:"json/sysmanas.json",
            success:function(data){
                $.each(data,function (indice, sysmana) {
                    $cartel=$('<div></div>')
                        .append($('<h3>' + sysmana.nombre + '</h3>'))
                        .append($('<img src="'+sysmana.foto+'" alt="">'));
                    $("#listacarteles").append($cartel);
                });
            }
        });
    };
}
