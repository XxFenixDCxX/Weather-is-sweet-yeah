//Creamos la clase TiempoPorDia con dos atributos, la URL a la API y la cabecera de la tabla para mostrar la info.
function TiempoPorDia() {
    this.apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
    this.apikey = 'a73a5857734a58b3c83651fb833fd316';
}

//Obtiene los datos de la ciudad introducida
TiempoPorDia.prototype.getData = function(lat, long, resultado) {  
    $.get(this.apiUrl + 'lat='+lat+'&lon='+long+'&appid='+this.apikey, function(datos) {
        var forecast = datos.list;

        // Crea arrays para almacenar los datos
        var dates = [];
        var icons = [];
        var temps = [];

        // Genera el HTML para cada día
        for (var i = 0; i < forecast.length; i+=8) { // Cada 8 elementos corresponden a un día

            var date = new Date(forecast[i].dt * 1000);
            var day = date.toLocaleDateString('es-ES', { weekday: 'long' });

            // Convierte la primera letra a mayúsculas
            day = day.charAt(0).toUpperCase() + day.slice(1);
            // Almacena los datos en los arrays
            dates.push(day);
            icons.push(forecast[i].weather[0].icon);
            temps.push((forecast[i].main.temp - 273.15).toFixed(1));
        }

        // Crea una tabla con los datos
        resultado += '<table class="table table-borderless text-center"><tr>';
        for (var i = 0; i < dates.length; i++) {
            resultado += '<td>' + dates[i] + '</td>';
        }
        resultado += '</tr><tr>';
        for (var i = 0; i < icons.length; i++) {
            resultado += '<td><img src="http://openweathermap.org/img/wn/'+icons[i]+'.png" alt="Icono del TiempoActual"></td>';
        }
        resultado += '</tr><tr>';
        for (var i = 0; i < temps.length; i++) {
            resultado += '<td>' + temps[i] + '°C</td>';
        }
        resultado += '</tr></table>';

        // Muestra la tabla en el div #tiempo
        $('#tiempo').html(resultado);
        $('#tiempoUbicacion').html(resultado);
    });
};
