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
const buscarCombos = async () => {
  const response = await fetch("../combos.json");
  const data = await response.json();
  localStorage.setItem("catalogo", JSON.stringify(data));
  console.log("El catálogo se ha cargado");
  console.log(data);
  verCombos(data);
  return data;
};

// funcion para mostrar combos
const verCombos = (data) => {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar las tarjetas

  data.forEach((c) => {
    const { nombre, img, descripcion, precio } = c;
    let card = document.createElement("div");
    card.setAttribute("class", "carta");
    card.innerHTML = `
      <img alt="${nombre}" src="${img}"/>
      <h3>${nombre}</h3>
      <p>${descripcion}</p>
      <h4>$${precio}</h4>
      <button class="addbtn" data-nombre="${nombre}"><a class='whiteLink'>Agregar al carrito</a></button>
    `;
    cardContainer.appendChild(card);
  });

  const agregarBoton = document.getElementsByClassName("addbtn");
  for (let btn of agregarBoton) {
    btn.addEventListener("click", () => agregarCarrito(btn.getAttribute("data-nombre")));
  }
};

// llamar a la función buscarCombos y verCombos
buscarCombos().then((data) => {
  verCombos(data);
});

// crear un array para el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// funcion para agregar al carrito
const agregarCarrito = (nombre) => {
  const data = JSON.parse(localStorage.getItem("catalogo"));
  const comboAgregado = data.find((i) => i.nombre === nombre);
  const toast = (nombre) => {
    Toastify({
      text: `${nombre} agregado con éxito`,
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  };
  let estaCarrito = carrito.some((combo) => combo.nombre === comboAgregado.nombre);
  if (estaCarrito) {
    const comboIndex = carrito.findIndex((c) => c.nombre === comboAgregado.nombre);
    const combo4cart = carrito[comboIndex];
    combo4cart.cantidad++;
    combo4cart.total = combo4cart.precio * combo4cart.cantidad;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    toast(combo4cart.nombre);
  } else {
    const combo4cart = {
      ...comboAgregado,
      cantidad: 1,
      total: comboAgregado.precio, // Actualizar el total del nuevo combo
    };
    carrito.push(combo4cart); // Usar "carrito" en lugar de "cart"
    localStorage.setItem("carrito", JSON.stringify(carrito));
    toast(combo4cart.nombre);
  }
};

// carrito vacio
const carritoVacio = () => {
  const cartContainer = document.getElementById("cartContainer");
  cartContainer.innerHTML = "";
  let sign = document.createElement("h2");
  sign.innerHTML = "No hay combos agregados";
  cartContainer.appendChild(sign);
};

//calcular el total
const calcularTotal = () => carrito.reduce((acc, val) => acc + val.total, 0);

//items del carrito
const combosCarrito = () => {
  const cartContainer = document.getElementById("cartContainer");
  cartContainer.innerHTML = "";
  let totalCompra = calcularTotal();
  let table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>Nombre</th>
      <th>Cantidad</th>
      <th>Total</th>
      <th>Eliminar</th>
    </tr>
  `;
  carrito.forEach((c, index) => {
    const { nombre, cantidad, total } = c;
    let filaCarrito = document.createElement("tr");
    filaCarrito.innerHTML = `
      <td>${nombre}</td>
      <td>${cantidad}</td>
      <td>$${total}</td>
      <td><button class="deletebtn" data-index="${index}">Eliminar</button></td>
    `;
    table.appendChild(filaCarrito);
  });
  
  let totalElement = document.createElement("tr");
  totalElement.innerHTML = `Total de la compra: $${totalCompra}`;
  table.appendChild(totalElement);
  cartContainer.appendChild(table);

  const eliminarBotones = document.getElementsByClassName("deletebtn");
  for (let btn of eliminarBotones) {
    btn.addEventListener("click", (event) => eliminarComboCarrito(event.target.dataset.index));
  }
};

// funcion para eliminar combo del carrito
const eliminarComboCarrito = (index) => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  combosCarrito();
};

// funcion para ver carrito
const verCarrito = () => {
  carrito.length ? combosCarrito() : carritoVacio();
};

// función para vaciar el carrito
const vaciarCarrito = () => {
  localStorage.removeItem("carrito");
  carrito = [];
  combosCarrito();
  Swal.fire({
    icon: "success",
    title: "Carrito vaciado",
    text: "El carrito ha sido vaciado correctamente.",
  });
};

// evento para ver carrito
const btnVer = document.getElementById("verCarrito");
btnVer.addEventListener("click", () => verCarrito());

// evento para actualizar el carrito
const btnActualizarCarrito = document.getElementById("actualizarCarrito");
btnActualizarCarrito.addEventListener("click", () => {
  verCarrito();
});

// evento para vaciar el carrito
const btnVaciarCarrito = document.getElementById("vaciarCarrito");
btnVaciarCarrito.addEventListener("click", () => {
  vaciarCarrito();
});

// mensaje de pedido
const pedido = () => {
  let mensaje = "";
  carrito.forEach((m) => {
    const { cantidad, nombre, total } = m;
    mensaje += `<p>(x${cantidad}) - ${nombre} - $${total}</p>`;
  });
  return mensaje;
};

// funcion confirmar pedido
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
        const mensajeConf = `Gracias por tu compra. Pronto serás contactado al número de teléfono ${telefono}.`;
        mostrarMensajeAgradecimiento(mensajeConf);
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

const mostrarMensajeAgradecimiento = (mensajeConf) => {
  Swal.fire({
    icon: "success",
    title: "¡Gracias por tu compra!",
    text: mensajeConf,
  });
};

// evento para confirmar
const confirmar = document.getElementById("confirmar");
confirmar.addEventListener("click", () => confirmarPedido());