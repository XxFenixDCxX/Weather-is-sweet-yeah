//Creamos la clase TiempoActual con dos atributos, la URL a la API y la cabecera de la tabla para mostrar la info.
function TiempoActual() {
    this.apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    this.apikey = 'a73a5857734a58b3c83651fb833fd316';
}

//Obtiene los datos de la ciudad introducida
TiempoActual.prototype.getData = function(lat, long, resultado) {  
    $.get(this.apiUrl + 'lat='+lat+'&lon='+long+'&appid='+this.apikey, function(datos) {
        var tiempoPorHora = new TiempoPorHora();
        resultado += '<img src="http://openweathermap.org/img/wn/'+datos.weather[0].icon+'.png" id="iconoTiempoActual" alt="Icono del TiempoActual"></div><div class="col-6 mt-4"><p class="card-text" id="temperaturaMaxima">Máxima: '+(datos.main.temp_max-273.15).toFixed(1)+'°C</p><p class="card-text" id="temperaturaMinima">Mínima: '+(datos.main.temp_min-273.15).toFixed(1)+'°C</p></div></div></div><ul class="TiempoActual list-group list-group-flush"><li class="list-group-item"><h5 class="text-center">Percepción por Horas</h5>';
        tiempoPorHora.getData(lat, long, resultado);
    });
};