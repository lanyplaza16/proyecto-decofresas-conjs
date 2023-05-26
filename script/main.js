// codigo JS

class Combo {
  constructor(nombre, precio, descripcion, img) {
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.img = img;
  }
}

// Funciones
// Fetch al JSON (combos.json)
const obtenerCombos = async () => {
  const API = "../combos.json";
  const response = await fetch(API);
  const data = await response.json();
  return data;
};

fetch("../combos.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

const cargarCombos = (catalogo) => {
  if (catalogo) {
    catalogo.forEach((c) => {
      const { nombre, img, descripcion, precio } = c;
      let card = document.createElement("div");
      card.setAttribute("class", "carta");
      card.innerHTML = `
        <img alt=${nombre} src='${img}'/>
        <h4>${nombre}</h4>
        <p>${descripcion}</p>
        <h3>$${precio}</h3>
        <button class="addbtn" id="${nombre}" ><a class='whiteLink'>Agregar al carrito</a></button>
        `;
        cardContainer.appendChild(card);
      });
    }
  };

// fin de funciones

// Guardar el catálogo en el Storage
// Utilizo la función asíncrona que hace el fetch: await obtenerCombos()
localStorage.getItem("catalogo")
  ? console.log("El catálogo ya está cargado en el storage")
  : (async () => {
      const data = await obtenerCombos();
      localStorage.setItem("catalogo", JSON.stringify(data));
    })();

// Determino dónde se van a mostrar mi catálogo y carrito
const cardContainer = document.getElementById("cardContainer");
const cartContainer = document.getElementById("cartContainer");

// Traigo el catálogo del storage
let catalogo = JSON.parse(localStorage.getItem("catalogo"));

// Cargo mis productos en la página
cargarCombos(catalogo);
