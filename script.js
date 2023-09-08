let datosCompletos = {};

// Fetch
function obtenerDatos() {
    fetch('https://api.frankfurter.app/latest')
        .then(response => response.json())
        .then(data => {
            datosCompletos = data.rates;
            mostrarDatos(datosCompletos);
        })
        .catch(error => console.error('Error:', error));
}

// Mostrar los datos
function mostrarDatos(datos) {
    const resultado = document.getElementById('resultado');
    let html = '';
    
    for (const moneda in datos) {
        html += `
        <div class="row border-bottom py-2">
            <div class="col-md-6 text-center">${moneda}</div>
            <div class="col-md-6 text-center">${datos[moneda]}</div>
        </div>`;
    }

    resultado.innerHTML = html;
}

// Buscar con mayúscula y minúscula
function filtrarMoneda() {
    const term = document.getElementById('buscadorMoneda').value.toUpperCase();
    const datosFiltrados = Object.fromEntries(
        Object.entries(datosCompletos).filter(([moneda]) => moneda.toUpperCase().includes(term))
    );
    
    mostrarDatos(datosFiltrados);
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('container', 'mt-5');
    obtenerDatos();

    document.getElementById('buscadorMoneda').addEventListener('keyup', event => {
        if (event.key === "Enter") filtrarMoneda();
    });
});