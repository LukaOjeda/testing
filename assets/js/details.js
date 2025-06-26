import { NewProducts } from "./dummy.js"; 

const detailsGroup = document.querySelector('#detailsGroup');
const details__price = document.querySelector('#detailsPrice');
const smallImagesGrid = detailsGroup.querySelector('.details__small-images');
const productDescription = document.querySelector('#productDescription');
const productStock = document.querySelector('#productStock');

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id")); // Convierte el id a número


const item = NewProducts.reverse()[id];

detailsGroup.innerHTML = `
    <img src="${item.productPic}" alt="" style="width: 275px"/>
  `;


  if(item.productOfferPrice){
    const disccount = (parseInt(item.productPrice.replace("$", "")) - parseInt(item.productOfferPrice.replace("$", ""))) / parseInt(item.productPrice.replace("$", "")) * 100;
    console.log(disccount);
    details__price.innerHTML = `
    <span class="new__price">${item.productOfferPrice}</span>
    <span class="old__price">${item.productPrice}</span>
    <span class="save__price">${Math.round(disccount)}% OFF</span>
  `;
  } else {
    details__price.innerHTML = `
    <span class="new__price">${item.productPrice}</span>
  `;
  }


  productDescription.innerHTML = `
    ${item.productInfo}
  `;

   productStock.innerHTML = `
    ${item.productStock}
  `;

