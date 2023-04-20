// Aca escribo mi JS

// Crear la clase combo
class Combo {
  constructor(numero, nombre, precio) {
    this.numero = numero;
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Crear los combos con sus atributos
const combos = [
  new Combo(1, "Box London", 4700),
  new Combo(2, "Box Grecia", 8800),
  new Combo(3, "Box Venecia", 13700)
];

// Funcion para calcular el total de la combra con las variables nombre del combo y cantidad aca utilizo el metodo find para conseguir el combo seleccionado
function calcularTotal(combo, cantidad) {
  let nombreCombo;
  let precioCombo;

  const comboSeleccionado = combos.find(c => c.nombre.toLowerCase() === combo.toLowerCase());
  if (comboSeleccionado) {
    nombreCombo = comboSeleccionado.nombre;
    precioCombo = comboSeleccionado.precio;
  } else {
    return "";
  }

  return nombreCombo + " - $" + precioCombo * cantidad;
}

// Simulador de compra al solicitar al usuario ingresar un nombre de combo
alert("¡Gracias por elegirnos!");

let comboValido = false;
let combo;

while (!comboValido) {
  combo = prompt("Por favor, indica el nombre del combo que quieres escoger: Box London, Box Grecia o Box Venecia");

  if (combos.some(c => c.nombre.toLowerCase() === combo.toLowerCase())) {
    comboValido = true;
  } else {
    alert("El nombre del combo ingresado no existe. Por favor, intente con un nombre de combo descrito en pantalla.");
  }
}

console.log("El combo escogido es " + combo);

//Solicitar al usuario la cantidad a comprar
let cantidad = parseInt(prompt("Por favor, ingrese la cantidad que desea comprar"));

console.log("Ha ingresado el combo " + combo + " y desea comprar " + cantidad + " unidades.");

let totalPagar = calcularTotal(combo, cantidad);

if (totalPagar !== "") {
  alert("El precio total de su compra es " + totalPagar);
} else {
  alert("Ha ocurrido un error al calcular el precio total. Por favor, intente de nuevo.");
}


