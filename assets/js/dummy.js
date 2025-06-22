let category = [];
let type = [];
let name = [];
let image = [];
let imageHover = [];
let info = [];
let price = [];
let id;

try {
  const res = await fetch("./database/database.db");
  const buf = await res.arrayBuffer();

  const SQL = await initSqlJs({
    locateFile: (filename) => `https://cdn.jsdelivr.net/npm/sql.js/dist/${filename}`,
  });

  const db = new SQL.Database(new Uint8Array(buf));
  let result = db.exec("SELECT category FROM abertures;");

  if (result.length && result[0].values.length) {
    category = result[0].values.map((row) => row[0]);
  } else {
    console.log("No se encontraron datos");
  }

  //***********************************************/

  result = db.exec("SELECT type FROM abertures;");

  if (result.length && result[0].values.length) {
    type = result[0].values.map((row) => row[0]);
  } else {
    console.log("No se encontraron datos");
  }

  //***********************************************/

  result = db.exec("SELECT name FROM abertures;");

  if (result.length && result[0].values.length) {
    name = result[0].values.map((row) => row[0]);
  } else {
    console.log("No se encontraron datos");
  }

  //***********************************************/

  result = db.exec("SELECT image FROM abertures;");

  if (result.length && result[0].values.length) {
    image = result[0].values.map((row) => row[0]);
  } else {
    console.log("No se encontraron datos");
  }

  //***********************************************/

  result = db.exec("SELECT imageHover FROM abertures;");

  if (result.length && result[0].values.length) {
    imageHover = result[0].values.map((row) => row[0]);
  } else {
    console.log("No se encontraron datos");
  }

  //***********************************************/

  result = db.exec("SELECT info FROM abertures;");

  if (result.length && result[0].values.length) {
    info = result[0].values.map((row) => row[0]);
  } else {
    console.log("No se encontraron datos");
  }

  //***********************************************/

  result = db.exec("SELECT price FROM abertures;");

  if (result.length && result[0].values.length) {
    price = result[0].values.map((row) => row[0]);
  } else {
    console.log("No se encontraron datos");
  }
  db.close();

  //***********************************************/
} catch (e) {
  console.error("Error cargando la base de datos:", e);
}

const NewProducts = [];

for (let i = category.length - 1; i >= 0; i--) {
  id = i.toString();
  NewProducts.push({
    productId: id,
    productCategory: category[i],
    productType: type[i],
    productName: name[i],
    productPic: image[i],
    productHover: imageHover[i],
    productInfo: info[i],
    productPrice: price[i],
  });
}

console.log(NewProducts);

export { NewProducts };
