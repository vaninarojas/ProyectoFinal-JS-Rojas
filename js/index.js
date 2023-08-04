const cardContainer = document.getElementById("cardContainer");
const totalPrecioSpan = document.getElementById("totalPrecio");
const comprarBtn = document.getElementById("comprarBtn");

let carrito = [];
let totalPrecio = 0;


function crearCardProducto(producto, index) {
  const card = document.createElement("div");
  card.classList.add("col-md-4", "mb-4");
  card.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <img src="${producto.imgUrl}" class= "w-100 card-img-top">
        <p>Categoria: ${producto.categoria}</p>
        <p>Stock: ${producto.stock}</p>
        
        <h6 class="card-text">Precio: $${producto.precio}</h6>
    <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.precio})">Agregar al carrito</button>
    <button class="btn btn-danger" onclick="eliminarDelCarrito(${index}, ${producto.precio})">Eliminar del carrito</button>
      </div>
    </div>
  `;
  return card;
}


function agregarAlCarrito(precio) {
  carrito.push(precio);
  totalPrecio += precio;
  totalPrecioSpan.textContent = totalPrecio;

  Swal.fire({
    icon: 'success',
    title: '¡Producto agregado al carrito!',
    text: 'El producto ha sido añadido al carrito de compras.',
  });

}

function eliminarDelCarrito(index, precio) {
  carrito.splice(index, 1);
  totalPrecio -= precio;
  totalPrecioSpan.textContent = totalPrecio;

  Swal.fire({
    icon: 'error',
    title: '¡Producto eliminado del carrito!',
    text: 'El producto ha sido eliminado del carrito de compras.',
  });

}


function mostrarProductosDesdeJSON() {
  fetch("../data/data.json")
    .then(response => response.json())
    .then(data => {
      data.forEach((producto, index) => {
        const card = crearCardProducto(producto, index);
        cardContainer.appendChild(card);
      });
    })
    
}

comprarBtn.addEventListener("click", () => {
  
  swal.fire({
  title: "COMPRA REALIZADA CON ÉXITO",
  icon: "success",
  confirmButtonText: "OK"
})
  carrito = [];
  totalPrecio = 0;
  totalPrecioSpan.textContent = totalPrecio;

});

function actualizarVistaCarrito() {
  cardContainer.innerHTML = "";
  carrito.forEach((producto, index) => {
    const card = crearCardProducto(productos[producto], index);
    cardContainer.appendChild(card);
  });


  totalPrecioSpan.textContent = totalPrecio;
}


mostrarProductosDesdeJSON();
