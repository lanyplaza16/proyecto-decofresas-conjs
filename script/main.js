// Aca escribo mi JS

// funcion que calcula el total a pagar
function calcularTotal(combo, cantidad) {

        let precioCombo;

        switch(combo) {
          case 1:
            precioCombo = 4700;
            break;
          case 2:
            precioCombo = 8800;
            break;
          case 3:
            precioCombo = 13700;
            break;
          default:
            return 0;
        }
        return precioCombo * cantidad;
      }

alert("¡Gracias por elegirnos!");

let comboValido = false; 
let combo;

while (!comboValido) {
  combo = parseInt(prompt("Por favor, indica el numero del combo que quieres escoger 1 al 3"));
  
  if (combo >= 1 && combo <= 3) {
    comboValido = true;
  } else {
    alert("El número del combo ingresado no existe. Por favor, intente con un numero de combo descrito en pantalla.");
  }
}

console.log("El combo escogido es " + combo);

let cantidad = parseInt(prompt("Por favor, ingrese la cantidad que desea comprar"));

console.log("Ha ingresado el combo " + combo + " y desea comprar " + cantidad + " unidades.");
      
let totalPagar = calcularTotal(combo, cantidad);
      
if (totalPagar > 0) {
alert("El precio total de su compra es $" + totalPagar);
} else {
        alert("Ha ocurrido un error al calcular el precio total. Por favor, intente de nuevo.");
      }
