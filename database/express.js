const express = require("express");
const app = express();
const port = 3000;

// Ruta para la página principal
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:${port}`);
});
