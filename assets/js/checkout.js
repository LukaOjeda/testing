document.addEventListener('DOMContentLoaded', () => {
  const cartBody = document.getElementById('checkoutCartBody');
  const subtotalElem = document.getElementById('checkoutSubtotal');
  const shippingElem = document.getElementById('checkoutShipping');
  const totalElem = document.getElementById('checkoutTotal');

  let carrito = JSON.parse(localStorage.getItem('pedidoActual')) || [];
  const shippingCost = 0; // Si quieres poner envío gratis o valor fijo

  if (carrito.length === 0) {
    cartBody.innerHTML = `<tr><td colspan="3" style="text-align:center;">Tu carrito está vacío</td></tr>`;
  } else {
    let subtotal = 0;

    cartBody.innerHTML = carrito.map(item => {
      const price = parseFloat(item.precio.replace('$', '').replace(',', ''));
      const itemTotal = price * item.cantidad;
      subtotal += itemTotal;

      return `
        <tr>
          <td><img src="${item.imagen}" alt="${item.nombre}" class="order__img"></td>
          <td>
            <h3 class="table__title">${item.nombre}</h3>
            <p class="table__quantity">x ${item.cantidad}</p>
          </td>
          <td><span class="table__price">$${itemTotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span></td>
        </tr>
      `;
    }).join('');

    subtotalElem.textContent = `$${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
    shippingElem.textContent = shippingCost === 0
      ? 'Gratis'
      : `$${shippingCost.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
    totalElem.textContent = `$${(subtotal + shippingCost).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const placeOrderBtn = document.querySelector('.btn--md');

  placeOrderBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const carrito = JSON.parse(localStorage.getItem('pedidoActual')) || [];

    if (carrito.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    const nombre = document.querySelector('.form__input:nth-child(1)').value;
    const direccion = document.querySelector('.form__input:nth-child(2)').value;
    const telefono = document.querySelector('.form__input:nth-child(3)').value;
    const nota = document.querySelector('.textarea').value;

    const includeShipping = document.getElementById('includeShipping').checked;
    const shippingToUSA = document.getElementById('shippingToUSA').checked;

    const productos = carrito.map(item => {
      return `${item.nombre} x${item.cantidad} - ${item.precio}`;
    }).join('\n');

    const shippingCosto = includeShipping ? (shippingToUSA ? 0 : 20000) : 0;
    const subtotal = carrito.reduce((acc, item) => {
      const precio = parseFloat(item.precio.replace('$', '').replace(',', ''));
      return acc + precio * item.cantidad;
    }, 0);
    const total = subtotal + shippingCosto;

    const params = {
      nombre,
      direccion,
      telefono,
      nota,
      productos,
      subtotal: `$${subtotal.toFixed(2)}`,
      envio: `$${shippingCosto.toFixed(2)}`,
      total: `$${total.toFixed(2)}`,
      to_email: "aberturasfuertehogar@gmail.com" // Aquí debes agregar tu correo de destinatario
    };

    console.log(params)

    try {
      const result = await emailjs.send('default_service', 'template_a92gykq', params);
      alert('¡Pedido enviado con éxito!');
      localStorage.removeItem('pedidoActual');
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Error al enviar el email:', error);
      alert('Hubo un problema al enviar tu pedido.');
    }
  });
});
