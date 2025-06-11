const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db'); // Usa una base de datos en memoria para este ejemplo

// Crear una tabla
db.serialize(() => {
    db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="items"', (err, row) => {
      if (!row) {
        db.run('CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT)');
      }
    });

  const stmt = db.prepare("INSERT INTO items VALUES (?)");
  for (let i = 0; i < 10; i++) {
    stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, price FROM items", (err, row) => {
    console.log(row.id + ": " + row.price);
  });
});

// Cerrar la base de datos
db.close();
