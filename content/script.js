function busqueda() {
    const elementosInicio = document.querySelectorAll('.inicio');
    elementosInicio.forEach(elemento => {
        elemento.classList.add('d-none');
    });
    const elementosBusqueda = document.querySelectorAll('.busqueda');
    elementosBusqueda.forEach(elemento => {
        var div = document.getElementById('tiempo');
        div.innerHTML = '';
        $('#busquedaError').empty();
        elemento.classList.remove('d-none');
    });
    const elementosUbicacion = document.querySelectorAll('.ubicacion');
    elementosUbicacion.forEach(elemento => {
        elemento.classList.add('d-none');
    });
}
function inicio() {
    const elementosBusqueda = document.querySelectorAll('.busqueda');
    elementosBusqueda.forEach(elemento => {
        elemento.classList.add('d-none');
    });
    const elementosInicio = document.querySelectorAll('.inicio');
    elementosInicio.forEach(elemento => {
        elemento.classList.remove('d-none');
        $('#busquedaError').empty();
    });
    const elementosUbicacion = document.querySelectorAll('.ubicacion');
    elementosUbicacion.forEach(elemento => {
        elemento.classList.add('d-none');
    });
}
function ubicacion() {
    const elementosBusqueda = document.querySelectorAll('.busqueda');
    elementosBusqueda.forEach(elemento => {
        elemento.classList.add('d-none');
    });
    const elementosInicio = document.querySelectorAll('.inicio');
    elementosInicio.forEach(elemento => {
        elemento.classList.add('d-none');
    });
    const elementosUbicacion = document.querySelectorAll('.ubicacion');
    elementosUbicacion.forEach(elemento => {
        var div = document.getElementById('tiempoUbicacion');
        div.innerHTML = '';
        $('#busquedaError').empty();
        elemento.classList.remove('d-none');
    });
    // Verifica si el navegador soporta la geolocalización
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(muestraPosicion);
    } else {
        $('#busquedaError').empty();
        $('#busquedaError').append('La geolocalización no es soportada por este navegador.');
    }

    // Esta función se llama cuando se obtiene la posición con éxito
    function muestraPosicion(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var tiempoActual = new TiempoActual();
        var apiUrl = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + lat + '&longitude=' + lon + '&localityLanguage=es';
        var resultado = ""
        $('#tiempoUbicacion').html('<br><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>');

        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        resultado += '<div class="card mt-5 rounded bg-info"><div class="card-body"><h2 class="card-title">'+data.locality+'</h2><div class="row"><div class="col-6">';
        tiempoActual.getData(lat, lon, resultado);
        });
    }
}