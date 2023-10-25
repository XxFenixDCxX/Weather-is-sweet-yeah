//Creamos la clase TiempoCoordenadas con dos atributos, la URL a la API y la cabecera de la tabla para mostrar la info.
function TiempoCoordenadas() {
    this.apiUrl = 'http://api.openweathermap.org/geo/1.0/';
    this.apikey = 'a73a5857734a58b3c83651fb833fd316';
}

//Obtiene los datos de la ciudad introducida
TiempoCoordenadas.prototype.getData = function() {
    
    $.get(this.apiUrl + 'direct?q='+$("#texto-introducido").val()+'&limit=1&appid='+this.apikey, function(datos) {
        $('#tiempo').html('<br><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>');
        var tiempoActual = new TiempoActual();
        var resultado = "";
        if (datos && datos.length > 0) {
            $.each(datos, function(index, datos) {
                $('#busquedaError').empty();
                resultado += '<div class="card mt-5 rounded bg-info"><div class="card-body"><h2 class="card-title" id="nombreCiudad">'+datos.name+'</h2><div class="row"><div class="col-6">';
                tiempoActual.getData(datos.lat, datos.lon, resultado);
            });
        } else {
            $('#busquedaError').empty();
            $('#busquedaError').append('No se han encontrado datos para la ciudad ' + $("#texto-introducido").val());
        }
    });
};

//Este fragmento es lo primero que se carga, cuando el $(document).ready
$(function() {
    var TiempoCoordenadasClient = new TiempoCoordenadas();
    
    $('#buscarTiempoCoordenadas').on('click', function() {
        TiempoCoordenadasClient.getData();
    });
});