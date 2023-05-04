// Aca escribo mi JS

// Comienzo de JS para Productos

//Cree los combos en formato json

const combos = [
  {
    "nombre": "Box London",
    "descripcion": "8 frutillas decoradas a tu gusto acompañado por 1 botella de Chamdon 187ml, 12 Ferrero Rocher y flores de temporada.",
    "precio": 4700
  },
  {
    "nombre": "Box Grecia",
    "descripcion": "8 frutillas decoradas a tu gusto acompañado por 1 botella de Chamdon 187ml y 1 chocolate.",
    "precio": 8800
  },
  {
    "nombre": "Box Venecia",
    "descripcion": "8 frutillas decoradas a tu gusto acompañado por 6 rosas y 12 ferrero rocher.",
    "precio": 13700
  }
];

// Modificación del DOM

const seccionCombo = document.getElementById("seccionCombo");

const btnSeleccionar1 = document.getElementById("botonLondon");
btnSeleccionar1.addEventListener("click", function() {
  actualizarSeccionCombo(0);
});

const btnSeleccionar2 = document.getElementById("botonGrecia");
btnSeleccionar2.addEventListener("click", function() {
  actualizarSeccionCombo(1);
});

const btnSeleccionar3 = document.getElementById("botonVenecia");
btnSeleccionar3.addEventListener("click", function() {
  actualizarSeccionCombo(2);
});

function actualizarSeccionCombo(indiceCombo) {
  const combo = combos[indiceCombo];
  seccionCombo.innerHTML = `
    <h2>${combo.nombre}</h2>
    <p>${combo.descripcion}</p>
    <p>Precio: $${combo.precio}</p>
  `;
}

// Fin de JS para Productos

// Comienzo de JS para Contactos

//Guardar datos

function guardarDatos() {
  const nombre = document.getElementById("exampleFormControlInput1").value;
  const telefono = document.getElementById("exampleFormControlInput2").value;
  const email = document.getElementById("exampleFormControlInput3").value;

  localStorage.setItem("exampleFormControlInput1", nombre);
  localStorage.setItem("exampleFormControlInput2", telefono);
  localStorage.setItem("exampleFormControlInput3", email);

  alert("Datos guardados correctamente");
}

window.onload = function() {
  const nombreGuardado = localStorage.getItem("exampleFormControlInput1");
  const telefonoGuardado = localStorage.getItem("exampleFormControlInput2");
  const emailGuardado = localStorage.getItem("exampleFormControlInput3");

  if (nombreGuardado && telefonoGuardado && emailGuardado) {
    alert(`Bienvenido ${nombreGuardado}, su teléfono es ${telefonoGuardado} y su email es ${emailGuardado}`);
  }
}
// Fin de JS para Contactos



