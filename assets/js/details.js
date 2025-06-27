import { NewProducts } from "./dummy.js"; 

const detailsGroup = document.querySelector('#detailsGroup');
const details__price = document.querySelector('#detailsPrice');
const productDescription = document.querySelector('#productDescription');
const productStock = document.querySelector('#productStock');

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id")); // Convierte el id a número

// Obtenemos el producto (asumiendo que NewProducts es un array)
const item = NewProducts.reverse()[id];

// Mostrar imagen
detailsGroup.innerHTML = `
  <img src="${item.productPic}" alt="" style="width: 275px"/>
`;

// Mostrar precios y descuento si aplica
if(item.productOfferPrice){
  const discount = (parseInt(item.productPrice.replace("$", "")) - parseInt(item.productOfferPrice.replace("$", ""))) / parseInt(item.productPrice.replace("$", "")) * 100;
  details__price.innerHTML = `
    <span class="new__price">${item.productOfferPrice}</span>
    <span class="old__price">${item.productPrice}</span>
    <span class="save__price">${Math.round(discount)}% OFF</span>
  `;
} else {
  details__price.innerHTML = `
    <span class="new__price">${item.productPrice}</span>
  `;
}

// Mostrar descripción y stock
productDescription.textContent = item.productInfo;
productStock.textContent = item.productStock;

// Botón y cantidad
const addToCartBtn = document.querySelector('.details__action .btn');
const quantityInput = document.querySelector('.details__action .quantity');

addToCartBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const cantidad = parseInt(quantityInput.value);
  if (cantidad < 1) {
    alert('Cantidad mínima 1');
    return;
  }
  if (cantidad > item.productStock) {
    alert('No hay suficiente stock');
    return;
  }

  // Leer carrito actual del localStorage
  let carrito = JSON.parse(localStorage.getItem('pedidoActual'));

// Validar que carrito sea un array, si no, inicializar vacío
if (!Array.isArray(carrito)) {
  carrito = [];
}

// Buscar si el producto ya está (por nombre)
const indexExistente = carrito.findIndex(prod => prod.nombre === item.productName);

  if (indexExistente !== -1) {
    const nuevaCantidad = carrito[indexExistente].cantidad + cantidad;
    if (nuevaCantidad > item.productStock) {
      alert('No hay suficiente stock para esa cantidad');
      return;
    }
    carrito[indexExistente].cantidad = nuevaCantidad;
  } else {
    carrito.push({
      nombre: item.productName,
      precio: item.productOfferPrice || item.productPrice,
      cantidad: cantidad,
      imagen: item.productPic,
      stock: item.productStock,
    });
  }

  // Guardar carrito actualizado
  localStorage.setItem('pedidoActual', JSON.stringify(carrito));

  alert('Producto agregado al carrito');
});