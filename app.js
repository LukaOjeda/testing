const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbPath = path.join(__dirname, 'database', 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a la base:', err.message);
  } else {
    console.log('Conectado a SQLite');
  }
});

// API: Obtener todos los productos
app.get('/api/products', (req, res) => {
  db.all('SELECT rowid as id, category, type, name, image, info, price, offerPrice, stock FROM abertures', (err, rows) => {
    if (err) {
      console.error('Error al consultar abertures:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// API: Agregar producto
app.post('/api/products', (req, res) => {
  const { category, type, name, image, info, price, offerPrice, stock } = req.body;
  db.run(
    'INSERT INTO abertures (category, type, name, image, info, price, offerPrice, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [category, type, name, image, info, price, offerPrice, stock],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ insertedId: this.lastID });
    }
  );
});

// API: Modificar producto (actualizar un solo campo)
app.put('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const { campo, valor } = req.body;

  const columnasPermitidas = ['category','type','name','image','info','price','offerPrice','stock'];
  if (!columnasPermitidas.includes(campo)) return res.status(400).json({ error: 'Campo no permitido' });

  db.run(
    `UPDATE abertures SET ${campo} = ? WHERE rowid = ?`,
    [valor, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// API: Eliminar producto
app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM abertures WHERE rowid = ?', id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Servir el HTML para administrar (colocá este archivo en /public/admin.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
  console.log('Servidor escuchando en http://localhost:' + PORT);
});
