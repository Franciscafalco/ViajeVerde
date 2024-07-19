document.addEventListener('DOMContentLoaded', function() {

    var searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            var origen = document.getElementById('origen').value.toLowerCase();
            var destino = document.getElementById('destino').value.toLowerCase();
            var fecha = document.getElementById('fecha').value;
            var resultsDiv = document.getElementById('searchResults');
            resultsDiv.innerHTML = '';

            var viajes = JSON.parse(localStorage.getItem('viajes')) || [];

            var resultados = viajes.filter(function(viaje) {
                return (!origen || viaje.origen.toLowerCase().includes(origen)) &&
                    (!destino || viaje.destino.toLowerCase().includes(destino)) &&
                    (!fecha || viaje.fecha === fecha);
            });

            if (resultados.length > 0) {
                resultados.forEach(function(viaje) {
                    var resultItem = document.createElement('div');
                    resultItem.innerHTML = `
                        <p><strong>Origen:</strong> ${viaje.origen}</p>
                        <p><strong>Destino:</strong> ${viaje.destino}</p>
                        <p><strong>Fecha:</strong> ${viaje.fecha}</p>
                        <p><strong>Hora:</strong> ${viaje.hora}</p>
                        <p><strong>Plazas disponibles:</strong> ${viaje.plazas}</p>
                        <p><strong>Comentarios:</strong> ${viaje.comentarios}</p>
                        <hr>
                    `;
                    resultsDiv.appendChild(resultItem);
                });
            } else {
                resultsDiv.innerHTML = '<p>No se encontraron resultados.</p>';
            }
        });
    }

    var offerForm = document.getElementById('offerForm');
    if (offerForm) {
        offerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            var origen = document.getElementById('origen').value;
            var destino = document.getElementById('destino').value;
            var fecha = document.getElementById('fecha').value;
            var hora = document.getElementById('hora').value;
            var plazas = document.getElementById('plazas').value;
            var comentarios = document.getElementById('comentarios').value;

            if (origen && destino && fecha && hora && plazas) {
                var viajes = JSON.parse(localStorage.getItem('viajes')) || [];
                var nuevoViaje = {
                    origen: origen,
                    destino: destino,
                    fecha: fecha,
                    hora: hora,
                    plazas: plazas,
                    comentarios: comentarios
                };
                viajes.push(nuevoViaje);
                localStorage.setItem('viajes', JSON.stringify(viajes));
                alert('Tu viaje ha sido publicado exitosamente.');
                offerForm.reset();
            } else {
                alert('Por favor, completa todos los campos obligatorios.');
            }
        });
    }
});
