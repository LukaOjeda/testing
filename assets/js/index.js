import { NewProducts } from "./dummy.js";
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";

//! new Products
const bannerDiv = document.querySelector("#productContainerGridMain");

bannerDiv.innerHTML = NewProducts.reverse().slice(-6).map(
  (item) =>
    `
  <div class="product__item" id="products" data-category="${item.productCategory}" data-type="${item.productType}"q>
                <div class="product__banner">
                    <img src="${item.productPic}" alt="" class="product__img default" />
                    <img src="${item.productPic}" alt="" class="product__img hover" />
                  <div class="product__badge light-pink">Hot</div>
                </div>
                <div class="product__content">
                  <span class="product__category">${item.productCategory}</span>
                  <a href="details.html">
                    <h3 class="product__title">${item.productName}</h3>
                  </a>
                  <span class="product__category">${item.productInfo}<br></span>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                </div>
                <div style="text-align: center;">
                <button id="details" style=" padding: 10px 20px;
                margin-bottom: 10px;
                                font-size: 1em;
                                cursor: pointer;
                                border: none;
                                border-radius: 4px;
                                width: 150px;
                                background-color: rgb(21, 70, 204);
                                color: white;" data-rowid="${item.productId}">ver</button>
                  </div>
          </div>
              
    `
).join("");

document.querySelectorAll("#details").forEach((item) => {
  item.addEventListener("click", () => {
    const id = item.getAttribute("data-rowid");
    window.location.href = `details.html?id=${id}`;
  });
});



