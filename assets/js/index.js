import { NewProducts } from "./dummy.js";
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";

//! new Products
const bannerDiv = document.querySelector("#productContainerGridMain");

bannerDiv.innerHTML = NewProducts.map(
  (item) =>
    `
  <div class="product__item" id="products" data-category="${item.productCategory}" data-type="${item.productType}">
                <div class="product__banner">
                  <a href="details.html" class="product__images">
                    <img src="${item.productPic}" alt="" class="product__img default" />
                    <img src="${item.productPic}" alt="" class="product__img hover" />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Add to Wishlist">
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-pink">Hot</div>
                </div>
                <div class="product__content">
                  <span class="product__category">${item.productCategory}</span>
                  <a href="details.html">
                    <h3 class="product__title">${item.productName}</h3>
                  </a>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a href="#" class="action__btn cart__btn" aria-label="Add To Cart">
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
    `
).join("");

document.querySelectorAll(".product-item").forEach((item) => {
  item.addEventListener("click", () => {
    const id = item.getAttribute("data-rowid");
    window.location.href = `products.html?id=${id}`;
  });
});
