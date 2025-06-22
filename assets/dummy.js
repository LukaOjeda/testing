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

const swiperData = [];

for (let i = 1; i <= 3; i++) {
  swiperData.push({
    avatar: `./assets/images/banner-${i}.jpg`,
    title: "Aberturas Fuerte Hogar",
    info: "Los mejores precios los encontrás acá",
    price: "starting at $ 20.00",
  });
}

export { swiperData };

export const TitleCategories = [
  {
    icon: "./assets/images/icons/door1.png",
    title: "INTERIOR",
    count: "(52)",
  },
  {
    icon: "./assets/images/icons/door3.png",
    title: "ALUMINIO",
    count: "(5)",
  },
  {
    icon: "./assets/images/icons/door2.png",
    title: "CHAPA",
    count: "(63)",
  },
  {
    icon: "./assets/images/icons/window2.png",
    title: "AIREADORES",
    count: "(41)",
  },
  {
    icon: "./assets/images/icons/window.png",
    title: "VENTANAS",
    count: "(32)",
  },
  {
    icon: "./assets/images/icons/ironFence.png",
    title: "REJAS",
    count: "(24)",
  },
  {
    icon: "./assets/images/icons/bigDoor¿.png",
    title: "PORTONES",
    count: "(75)",
  },
];

export const BolgSwiper = [
  {
    pic: "./assets/images/products/shoe-1.jpg",
    title: "Puertas",
    info: "Clothes Retail KPIs 2021 Guide for Clothes Executives.",
    date: "By Mr Admin / Apr 06, 2022",
  },
  {
    pic: "./assets/images/products/shoe-1.jpg",
    title: "Portones",
    info: "Curbside fashion Trends: How to Win the Pickup Battle.",
    date: "By Mr Robin / Jan 18, 2022",
  },
  {
    pic: "./assets/images/products/shoe-1.jpg",
    title: "Ventanas",
    info: "EBT vendors: Claim Your Share of SNAP Online Revenue.",
    date: "By Mr Selsa / Feb 10, 2022",
  },
  {
    pic: "./assets/images/products/shoe-1.jpg",
    title: "Rejas",
    info: "Curbside fashion Trends: How to Win the Pickup Battle.",
    date: "By Mr Pawar / Mar 15, 2022",
  },
];

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
