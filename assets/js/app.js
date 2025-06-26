const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

// Ruta a la base de datos
const dbPath = path.join(__dirname, '..', '..', 'database', 'orders.db');
const db = new sqlite3.Database(dbPath);

// Sirve el panel HTML
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Panel de Pedidos</title>
  <style>
    table { border-collapse: collapse; width: 100%; margin-top: 20px; }
    th, td { border: 1px solid #ccc; padding: 8px; }
    th { background-color: #f5f5f5; }
  </style>
</head>
<body>
  <h1>Panel de Pedidos</h1>
  <table id="ordersTable">
    <thead>
      <tr>
        <th>ID</th><th>Cliente</th><th>Fecha</th><th>Estado</th><th>Acciones</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <script>
    async function cargarPedidos() {
      const res = await fetch('/api/orders');
      const pedidos = await res.json();
      const tbody = document.querySelector('tbody');
      tbody.innerHTML = '';
      pedidos.forEach(pedido => {
        const tr = document.createElement('tr');
        tr.innerHTML = \`
          <td>\${pedido.id}</td>
          <td>\${pedido.cliente}</td>
          <td>\${pedido.fecha}</td>
          <td>
            <select onchange="cambiarEstado(\${pedido.id}, this.value)">
              <option \${pedido.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
              <option \${pedido.estado === 'En preparación' ? 'selected' : ''}>En preparación</option>
              <option \${pedido.estado === 'Enviado' ? 'selected' : ''}>Enviado</option>
              <option \${pedido.estado === 'Entregado' ? 'selected' : ''}>Entregado</option>
            </select>
          </td>
          <td><button onclick="eliminarPedido(\${pedido.id})">Eliminar</button></td>
        \`;
        tbody.appendChild(tr);
      });
    }

    async function cambiarEstado(id, nuevoEstado) {
      await fetch('/api/orders/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      alert('Estado actualizado');
    }

    async function eliminarPedido(id) {
      await fetch('/api/orders/' + id, { method: 'DELETE' });
      cargarPedidos();
    }

    cargarPedidos();
  </script>
</body>
</html>`);
});

// API: Obtener todos los pedidos
app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM orders', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// API: Actualizar estado
app.put('/api/orders/:id', (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  db.run('UPDATE orders SET estado = ? WHERE id = ?', [estado, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// API: Eliminar pedido
app.delete('/api/orders/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM orders WHERE id = ?', id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => {
  console.log("Servidor escuchando en http://localhost:${PORT}");
});

