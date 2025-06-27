document.addEventListener('DOMContentLoaded', () => {
  const cartBody = document.getElementById('cartBody');
  const shippingCost = 20000; // Cambia este valor si quieres otro costo de envío

  // Cargar carrito desde localStorage o array vacío si no hay nada
  let carrito = JSON.parse(localStorage.getItem('pedidoActual')) || [];

  function renderCart() {
    if (carrito.length === 0) {
      cartBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">El carrito está vacío</td></tr>`;
      actualizarTotales(); // Para que muestre totales 0
      return;
    }

    cartBody.innerHTML = carrito.map((item, index) => {
      const priceNumber = parseFloat(item.precio.replace('$', '').replace(',', ''));
      const subtotal = priceNumber * item.cantidad;

      return `
        <tr>
          <td><img src="${item.imagen}" alt="${item.nombre}" width="80"></td>
          <td>${item.nombre}</td>
          <td>${item.precio}</td>
          <td>
            <input type="number" min="1" value="${item.cantidad}" data-index="${index}" class="quantity-input" />
          </td>
          <td>$${subtotal.toFixed(2)}</td>
          <td><button data-index="${index}" class="remove-btn">Eliminar</button></td>
        </tr>
      `;
    }).join('');

    actualizarTotales();
    agregarListeners();
  }

  function actualizarTotales() {
    const subtotal = carrito.reduce((acc, item) => {
      const priceNumber = parseFloat(item.precio.replace('$', '').replace(',', ''));
      return acc + priceNumber * item.cantidad;
    }, 0);

    const total = subtotal + shippingCost;

    const cartTotalTable = document.querySelector('.cart__total-table');

    cartTotalTable.innerHTML = `
      <tr>
        <td><span class="cart__total-title">Carrito</span></td>
        <td><span class="cart__total-price">$${subtotal.toFixed(2)}</span></td>
      </tr>
      <tr>
        <td><span class="cart__total-title">Total</span></td>
        <td><span class="cart__total-price">$${total.toFixed(2)}</span></td>
      </tr>
    `;
  }

  function agregarListeners() {
    // Actualizar cantidad al cambiar input
    const inputsCantidad = document.querySelectorAll('.quantity-input');
    inputsCantidad.forEach(input => {
      input.addEventListener('change', (e) => {
        const index = e.target.dataset.index;
        let nuevaCantidad = parseInt(e.target.value);
        if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
          nuevaCantidad = 1;
          e.target.value = 1;
        }
        carrito[index].cantidad = nuevaCantidad;
        guardarCarrito();
        renderCart();
      });
    });

    // Eliminar producto
    const botonesEliminar = document.querySelectorAll('.remove-btn');
    botonesEliminar.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        carrito.splice(index, 1);
        guardarCarrito();
        renderCart();
      });
    });
  }

  function guardarCarrito() {
    localStorage.setItem('pedidoActual', JSON.stringify(carrito));
  }

  // Inicializar renderizado
  renderCart();
});
