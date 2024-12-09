/**

	Copyright (c) 2024 Diego-Emiliano

	The following code is a derivative work of the code from frontend_search_engine (https://github.com/Diego-Emiliano/frontend_search_engine),
	which is licensed under the MIT License.
	This code is licensed under the MIT License. (see LICENSE.txt or https://github.com/Diego-Emiliano/Diego-Emiliano.github.io/blob/main/LICENSE.txt)
     
**/

const data = [
    { fecha: "1", nombre: "Estadística basica", url: "/" },
    { fecha: "2", nombre: "Fundamentos de la Administración", url: "/" },
    { fecha: "3", nombre: "Fundamentos de la Investigación", url: "/" },
    { fecha: "4", nombre: "Organisación y gestión del tiempo", url: "/" },
    { fecha: "5", nombre: "Trabajo en equipo", url: "/" },
    { fecha: "6", nombre: "Toma de decisiones y comunicación asertiva", url: "/" },
    { fecha: "6", nombre: "Creatividad y resolución de problemas", url: "/" },
    { fecha: "6", nombre: "Contexto socioeconómico de México", url: "/" }
];

const input = document.getElementById("searchInput");
const limpiador = document.getElementById("limpiador");
const resultContainer = document.getElementById("resultContainer");

input.addEventListener("keypress", function (ev) {
	if (event.key === "Enter") {
		ev.preventDefault(); // Evitar el envío del formulario
	}
});

limpiador.addEventListener("click", function (ev) {
    ev.preventDefault(); // Evitar el envío del formulario
});

function search() {
    const filter = input.value.toUpperCase();

    // Limpiar resultados previos
    resultContainer.innerHTML = "";

    // Si no hay texto en el campo de búsqueda, no mostrar nada
    if (!filter) {
        return; // Salir de la función si el campo está vacío
    }

    // Filtrar los datos
    const filteredData = data.filter(item => {
        return item.fecha.toUpperCase().includes(filter) || 
               item.nombre.toUpperCase().includes(filter);
    });

    // Limitar a un máximo de 4 resultados
    const resultsToShow = filteredData.slice(0, 4);

    // Mostrar resultados
    resultsToShow.forEach(item => {
        const div = document.createElement("div");
        div.className = "result-item";

        // Crear un enlace
        const link = document.createElement("a");
        link.href = item.url; // URL del enlace
        link.textContent = `${item.nombre} ${item.fecha}`; // Texto del enlace
        link.target = "_self"; // Abrir en nueva pestaña

        div.appendChild(link); // Añadir el enlace al div
        resultContainer.appendChild(div); // Añadir el div al contenedor de resultados
    });

    // Mensaje si no hay resultados
    if (resultsToShow.length === 0) {
        resultContainer.innerHTML = "<div class='result-item'>No se encontraron resultados.</div>";
    }
}

function limpiar() {
	resultContainer.innerHTML = "";
	input.value = "";
}
