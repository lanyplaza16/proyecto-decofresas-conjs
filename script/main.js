// constructor de combos
class Combo {
  constructor(nombre, precio, descripcion, img) {
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.img = img;
  }
}

// funcion obtener combos de combos.json
const traerCatalogo = async () => {
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

// funcion generar cards para cada combo
const mostrarCatalogo = (catalogo) => {
  catalogo.forEach((c) => {
    const { nombre, img, descripcion, precio } = c;
    let card = document.createElement("div");
    card.setAttribute("class", "carta");
    card.innerHTML = `
      <img alt=${nombre} src="${img}"/>
      <h3>${nombre}</h3>
      <p>${descripcion}</p>
      <h4>$${precio}</h4>
      <button class="addbtn" id="${nombre}"><a class='whiteLink'>Agregar al carrito</a></button>
    `;
    cardContainer.appendChild(card);
  });
};

// funcion agregar al carrito
const agregarCarrito = (nombre) => {
  const comboCarrito = catalogo.find((c) => c.nombre === nombre);
  const toast = (nombre) => {
    Toastify({
      text: `${nombre} agregado con éxito`,
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  };

  // Array para el carrito
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let hayCarrito = carrito.some((combo) => combo.nombre === nombre);

  if (hayCarrito) {
    const itemIndex = carrito.findIndex((c) => c.nombre === comboCarrito.nombre);
    const item4cart = carrito[itemIndex];
    item4cart.cantidad++;
    item4cart.total = item4cart.precio * item4cart.cantidad;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    toast(item4cart.nombre);
  } else {
    const item4cart = {
      ...comboCarrito,
      cantidad: 1,
      total: comboCarrito.precio,
    };
    carrito.push(item4cart);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    toast(item4cart.nombre);
  }
};

const cartContainer = document.getElementById("cartContainer");

const carritoVacio = () => {
  cartContainer.innerHTML = "";
  let sign = document.createElement("h2");
  sign.innerHTML = "Su carrito está vacío";
  cartContainer.appendChild(sign);
};

const itemsCarrito = () => {
  cartContainer.innerHTML = "";
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  // Crear tabla
  let table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>Nombre</th>
      <th>Cantidad</th>
      <th>Total</th>
      <th>Eliminar</th>
    </tr>
  `;
  
  // Agregar filas a la tabla con los elementos del carrito
  carrito.forEach((p, index) => {
    const { nombre, cantidad, total } = p;
    
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${nombre}</td>
      <td>${cantidad}</td>
      <td>$${total}</td>
      <td><button class="deletebtn" data-index="${index}">Eliminar</button></td>
    `;
    
    table.appendChild(row);
  });
  
  cartContainer.appendChild(table);
  
  // Agregar eventos a los botones de eliminar
  const deleteButtons = document.getElementsByClassName("deletebtn");
  for (let btn of deleteButtons) {
    btn.addEventListener("click", (event) => eliminarItemCarrito(event.target.dataset.index));
  }
};

const eliminarItemCarrito = (index) => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  // Eliminar elemento del carrito por su índice
  carrito.splice(index, 1);
  
  localStorage.setItem("carrito", JSON.stringify(carrito));
  
  itemsCarrito();
};

const verCarrito = () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.length ? itemsCarrito() : carritoVacio();
};

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const pedido = () => {
  let message = "";
  carrito.forEach((m) => {
    const { cantidad, nombre, total } = m;
    message += `<p>(x${cantidad}) - ${nombre} - $${total}</p>`;
  });
  return message;
};

const total = () => {
  return carrito.reduce((acc, val) => acc + val.total, 0);
};

const confirmarPedido = () => {
  if (carrito.length) {
    const DateTime = luxon.DateTime;
    const fecha = DateTime.now().setLocale("es").toLocaleString();

    Swal.fire({
      title: "Confirmar compra",
      html: `
        <div>
          <h4>Detalle del pedido:</h4>
          ${pedido()}
        </div>
        <div>
          <p>Ingrese su número de teléfono:</p>
          <input type="text" id="telefonoInput" placeholder="Número de teléfono" required>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const telefono = document.getElementById("telefonoInput").value;
        return telefono;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const telefono = result.value;

        // Mandar mensaje de agradecimiento
        const mensaje = `Gracias por tu compra. Pronto serás contactado al número de teléfono ${telefono}.`;
        mostrarMensajeAgradecimiento(mensaje);
      }
    });
  } else {
    Swal.fire({
      icon: "info",
      title: "Carrito vacío",
      text: "No tienes elementos en el carrito. Agrega productos antes de confirmar la compra.",
    });
  }
};

const mostrarMensajeAgradecimiento = (mensaje) => {
  Swal.fire({
    icon: "success",
    title: "¡Gracias por tu compra!",
    text: mensaje,
  });
};


// Guardar el catálogo en el storage
if (!localStorage.getItem("catalogo")) {
  traerCatalogo()
    .then((data) => {
      localStorage.setItem("catalogo", JSON.stringify(data));
      catalogo = data;
      mostrarCatalogo(catalogo);
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  catalogo = JSON.parse(localStorage.getItem("catalogo"));
  mostrarCatalogo(catalogo);
}

// Crear evento al botón agregar al carrito
const botones = document.getElementsByClassName("addbtn");
for (let btn of botones) {
  btn.addEventListener("click", () => agregarCarrito(btn.id));
}

// Crear evento al botón ver carrito
const btnVer = document.getElementById("verCarrito");
btnVer.addEventListener("click", () => verCarrito());

// Agregar evento al botón confirmar
const confirmar = document.getElementById("confirmar");
confirmar.addEventListener("click", () => confirmarPedido());
