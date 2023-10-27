//Creamos la clase TiempoPorHora con dos atributos, la URL a la API y la cabecera de la tabla para mostrar la info.
function TiempoPorHora() {
    this.apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
    this.apikey = 'a73a5857734a58b3c83651fb833fd316';
}

//Obtiene los datos de la ciudad introducida
TiempoPorHora.prototype.getData = function(lat, long, resultado) {  
    $.get(this.apiUrl + 'lat='+lat+'&lon='+long+'&appid='+this.apikey, function(datos) {
        var forecast = datos.list;

        // Crea arrays para almacenar los datos
        var times = [];
        var icons = [];
        var temps = [];

        // Genera el HTML para cada hora
        for (var i = 0; i < 5; i++) {

            var date = new Date(forecast[i].dt * 1000);
            var time = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });

            // Almacena los datos en los arrays
            times.push(time);
            icons.push(forecast[i].weather[0].icon);
            temps.push((forecast[i].main.temp - 273.15).toFixed(1));
        }

        // Crea una tabla con los datos
        resultado += '<table class="table table-borderless text-center"><tr>';
        for (var i = 0; i < times.length; i++) {
            resultado += '<td>' + times[i] + '</td>';
        }
        resultado += '</tr><tr>';
        for (var i = 0; i < icons.length; i++) {
            resultado += '<td><img src="http://openweathermap.org/img/wn/'+icons[i]+'.png" alt="Icono del TiempoActual"></td>';
        }
        resultado += '</tr><tr>';
        for (var i = 0; i < temps.length; i++) {
            resultado += '<td>' + temps[i] + '</td>';
        }
        resultado += '</tr></table></li><li class="list-group-item"><h5 class="text-center">Prevision por Días</h5>';
        var tiempoPorDia = new TiempoPorDia();
        tiempoPorDia.getData(lat, long, resultado);
    });
};
