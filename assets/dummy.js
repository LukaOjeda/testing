document.addEventListener("DOMContentLoaded", () => {
  // Función para cargar la base de datos automáticamente
  fetch("./database/database.db")
    .then((res) => res.arrayBuffer())
    .then((buf) =>
      initSqlJs({
        locateFile: (filename) =>
          `https://cdn.jsdelivr.net/npm/sql.js/dist/${filename}`,
      }).then((SQL) => {
        const db = new SQL.Database(new Uint8Array(buf));
        const present = db.exec("SELECT present FROM products;");

        // Mostrar los valores en la página
        // Asegúrate de que 'present[0].values' tenga datos
        console.log(present[0].values[0][0]);
        db.close();
      })
    )
    .catch((e) => {
      console.log(e);
    });
});

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

for (let i = 1; i <= 12; i++) {
  NewProducts.push({
    present: `hola`,
    productPic: "./assets/images/products/shoe-1.jpg",
    productHover: "./assets/images/products/shoe-1.jpg",
    productName: "SHORTS",
    productInfo: "Better Basics French Terry Sweatshorts",
    productPrice: "$48.00",
    taxPrice: "$75.00",
  });
}

export { NewProducts };

/*export const NewProducts = [
  {
    present: "15%",
    productPic: "./assets/images/products/shoe-1.jpg",
    productHover: "./assets/images/products/shoe-1.jpg",
    productName: "SHORTS",
    productInfo: "Better Basics French Terry Sweatshorts",
    productPrice: "$48.00",
    taxPrice: "$75.00",
  },
  {
    present: "",
    productPic: "./assets/images/products/shoe-1.jpg",
    productHover: "./assets/images/products/shoe-1.jpg",
    productName: "SHORTS",
    productInfo: "Better Basics French Terry Sweatshorts",
    productPrice: "$48.00",
    taxPrice: "$75.00",
  },
  {
    present: "12%",
    productPic: "./assets/images/products/shoe-1.jpg",
    productHover: "./assets/images/products/shoe-1.jpg",
    productName: "SHORTS",
    productInfo: "Better Basics French Terry Sweatshorts",
    productPrice: "$48.00",
    taxPrice: "$75.00",
  },
  {
    present: "",
    productPic: "./assets/images/products/shoe-1.jpg",
    productHover: "./assets/images/products/shoe-1.jpg",
    productName: "SHORTS",
    productInfo: "Better Basics French Terry Sweatshorts",
    productPrice: "$48.00",
    taxPrice: "$75.00",
  },
  {
    present: "",
    productPic: "./assets/images/products/shoe-1.jpg",
    productHover: "./assets/images/products/shoe-1.jpg",
    productName: "SHORTS",
    productInfo: "Better Basics French Terry Sweatshorts",
    productPrice: "$48.00",
    taxPrice: "$75.00",
  },
  {
    present: "",
    productPic: "./assets/images/products/shoe-1.jpg",
    productHover: "./assets/images/products/shoe-1.jpg",
    productName: "SHORTS",
    productInfo: "Better Basics French Terry Sweatshorts",
    productPrice: "$48.00",
    taxPrice: "$75.00",
  },
  {
    present: "",
    productPic: "./assets/images/products/shoe-1.jpg",
    productHover: "./assets/images/products/shoe-1.jpg",
    productName: "SHORTS",
    productInfo: "Better Basics French Terry Sweatshorts",
    productPrice: "$48.00",
    taxPrice: "$75.00",
  },
  {
    present: "",
    productPic: "./assets/images/products/shoe-1.jpg",
    productHover: "./assets/images/products/shoe-1.jpg",
    productName: "SHORTS",
    productInfo: "Better Basics French Terry Sweatshorts",
    productPrice: "$48.00",
    taxPrice: "$75.00",
  },
  {
    present: "",
    productPic: "./assets/images/products/shoe-1.jpg",
    productHover: "./assets/images/products/shoe-1.jpg",
    productName: "SHORTS",
    productInfo: "Better Basics French Terry Sweatshorts",
    productPrice: "$48.00",
    taxPrice: "$75.00",
  },
  {
    present: "",
    productPic: "./assets/images/products/shoe-1.jpg",
    productHover: "./assets/images/products/shoe-1.jpg",
    productName: "SHORTS",
    productInfo: "Better Basics French Terry Sweatshorts",
    productPrice: "$48.00",
    taxPrice: "$75.00",
  },
  {
    present: "15%",
    productPic: "./assets/images/products/shoe-1.jpg",
    productHover: "./assets/images/products/shoe-1.jpg",
    productName: "SHORTS",
    productInfo: "Better Basics French Terry Sweatshorts",
    productPrice: "$48.00",
    taxPrice: "$75.00",
  },
  {
    present: "",
    productPic: "./assets/images/products/shoe-1.jpg",
    productHover: "./assets/images/products/shoe-1.jpg",
    productName: "SHORTS",
    productInfo: "Better Basics French Terry Sweatshorts",
    productPrice: "$48.00",
    taxPrice: "$75.00",
  },
];*/
