/**

	Copyright (c) 2024 Diego-Emiliano

	This file is part of (https://github.com/Diego-Emiliano/Diego-Emiliano.github.io),
	which is licensed under the MIT License. (see LICENSE.txt or https://github.com/Diego-Emiliano/Diego-Emiliano.github.io/blob/main/LICENSE.txt)
     
**/

const contenedor = document.getElementById("contenedor");
const buscador_filtro = document.getElementById("buscador_filtro");
const categorias = document.getElementById("categorias");
const fecha = document.getElementById("fecha");

const boton_anterior = document.getElementById("anterior");
const boton_siguiente = document.getElementById("siguiente");
const select_paginas = document.getElementById("paginas");
const boton_filtrar = document.getElementById("filtrar");

const resultados = 4;

var dato1 = 0;
var dato2 = resultados;

var filtro;

buscador_filtro.addEventListener("keypress", function(ev) {
	if(event.key === "Enter") {
		filtrar();
	}
});

//Por si no recarga tu navegador correctamente el html
buscador_filtro.value = "";

boton_siguiente.setAttribute("disabled", "");

boton_anterior.setAttribute("disabled", "");

select_paginas.setAttribute("disabled", "");

function filtrar() {

    dato2 = resultados;
    dato1 = 0;
    
    select_paginas.removeAttribute("disabled");
    
    boton_anterior.setAttribute("disabled", "");

	const mayusculas = buscador_filtro.value.toUpperCase();
	
	const categoriasIndice = categorias.selectedIndex;
	const categoriasMayuscula = categorias.options[categoriasIndice].value.toUpperCase();
	const fechaIndice = fecha.selectedIndex;
	const fechaMayuscula = fecha.options[fechaIndice].value.toUpperCase();
	
    // Limpiar resultados previos
	contenedor.innerHTML = "";

	// Filtrar los datos
	filtro = data.filter(item => {
		return `${item.fecha.toUpperCase()} ${item.nombre.toUpperCase()}`.includes(mayusculas) &&
		item.categoria.toUpperCase().includes(categoriasMayuscula) &&
		item.fecha.toUpperCase().includes(fechaMayuscula)
	});

    // Botones
    
    if(dato2 >= filtro.length){
		boton_siguiente.setAttribute("disabled", "")
	}
	
	if(!(dato2 >= filtro.length)){
		boton_siguiente.removeAttribute("disabled")
    }

	// Limitar a un máximo los resultados
	const resultado = filtro.slice(dato1, dato2);

	// Mostrar resultados
	resultado.forEach(item => {

		contenedor.insertAdjacentHTML("beforeend",
		`<div class="result-item" ><a href="${item.url}" target="_self">${item.nombre} ${item.fecha}</a><p>${item.descripcion}</p></div>`)

	});

	// Mensaje si no hay resultados
	if(resultado.length === 0) {
		
		contenedor.insertAdjacentHTML("beforeend",
		`<p>No hay resultados</p>`)
		
		select_paginas.setAttribute("disabled", "");
		boton_anterior.setAttribute("disabled", "");
	}
	
    // Selector
    const pagina = dato2/resultados;
    const paginas = Math.ceil(filtro.length/resultados);
    select_paginas.innerHTML = "";
    for (let i = 0; i < paginas; i++) {
		const option_number = 1 + i;
		
		select_paginas.insertAdjacentHTML("beforeend",
		`<option id="${option_number}" >${option_number}</option>`)
		
    }
    if (resultado.length > 0) {
		document.getElementById(`${pagina}`).setAttribute("selected", "");
    }
}

function siguiente() {
		
		// Limpiar resultados previos
		contenedor.innerHTML = "";
		
		// Botones

		dato1+=resultados;
		dato2+=resultados;
		
		if(dato2 >= filtro.length){
			boton_siguiente.setAttribute("disabled", "")
		}
		
		if(!(dato1 === 0)){
			boton_anterior.removeAttribute("disabled")
		}

		// Limitar a un máximo los resultados
		const resultado = filtro.slice(dato1, dato2);

		// Mostrar resultados
		resultado.forEach(item => {

		contenedor.insertAdjacentHTML("beforeend",
		`<div class="result-item" ><a href="/a" target="_self">${item.nombre} ${item.fecha}</a><p>${item.descripcion}</p></div>`)

		});

		// Selector
		const pagina = dato2/resultados;
		const previous_option = pagina-1;
		document.getElementById(`${previous_option}`).removeAttribute("selected");
		document.getElementById(`${pagina}`).setAttribute("selected", "");
	
}

function anterior() {
		
		// Limpiar resultados previos
		contenedor.innerHTML = "";
		
		// Botones

		dato1-=resultados;
		dato2-=resultados;

		if(dato1 === 0){
			boton_anterior.setAttribute("disabled", "");
		}
		
		if(!(dato2 >= filtro.length)){
			boton_siguiente.removeAttribute("disabled")
		}

		// Limitar a un máximo los resultados
		const resultado = filtro.slice(dato1, dato2);

		// Mostrar resultados
		resultado.forEach(item => {

		contenedor.insertAdjacentHTML("beforeend",
		`<div class="result-item" ><a href="/a" target="_self">${item.nombre} ${item.fecha}</a><p>${item.descripcion}</p></div>`)

		});

		// Selector
		const pagina = dato2/resultados;
		const previous_option = pagina+1;
		document.getElementById(`${previous_option}`).removeAttribute("selected");
		document.getElementById(`${pagina}`).setAttribute("selected", "");
		
	}

function select() {
		
		// Limpiar resultados previos
		contenedor.innerHTML = "";
		
		// Selector
		const pagina = dato2/resultados;
		document.getElementById(`${pagina}`).removeAttribute("selected");
		const x = select_paginas.selectedIndex+1;
		dato1 = x*resultados-resultados;
		dato2 = x*resultados;
		document.getElementById(`${x}`).setAttribute("selected", "");

		// Botones
		if(dato1 === 0){
			boton_anterior.setAttribute("disabled", "");
		}

		if(!(dato2 >= filtro.length)){
			boton_siguiente.removeAttribute("disabled")
		}
		
		if(dato2 >= filtro.length){
			boton_siguiente.setAttribute("disabled", "")
		}
		
		if(!(dato1 === 0)){
			boton_anterior.removeAttribute("disabled")
		}

		// Limitar a un máximo los resultados
		const resultado = filtro.slice(dato1, dato2);

		// Mostrar resultados
		resultado.forEach(item => {

				contenedor.insertAdjacentHTML("beforeend",
				`<div class="result-item" ><a href="/a" target="_self">${item.nombre} ${item.fecha}</a><p>${item.descripcion}</p></div>`)

		});
}
