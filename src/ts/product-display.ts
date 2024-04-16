import "./../scss/style.scss";
import { cart, saveToStorage, updateCartQuantity } from "./main";
import {products} from "./models/products";

// Generera HTML för produkter //

let productsHTML = "";
products.forEach((product) => {
  productsHTML += `
  <a href="product-details.html?id=${product.id}" class="product-link">
    <div class="product" id=${product.id}>
    <img src="${product.image}" alt="Awesome Product" class="product__image">
    <h1 class="product__name">${product.name}</h1>
    <p class="product__brand">${product.brand}</p>
    <p class="product__price">${product.price} SEK</p>
    <button class="product__add-to-cart
    ts-add-to-cart"
    data-product-id="${product.id}">Add to Cart</button>
  </div>
`;
});

// Skapa produkterna i section ts-product-display //
const productDisplaySection = document.querySelector(".ts-product-display");

if (productDisplaySection) {
  productDisplaySection.innerHTML = productsHTML;

  //Klick event för produkterna
  productDisplaySection.addEventListener("click", (event) => {
    const targetElement = event.target as HTMLElement;

    //Är produkten ett Html element, exkludera "add to cart" knappen
    if (targetElement instanceof HTMLElement) {
      const isProductCardClicked =
        targetElement.closest(".product") &&
        !targetElement.closest(".product__add-to-cart");

      if (isProductCardClicked) {
        // Hämta id från proddukten du klicka på
        const productId = targetElement.closest(".product")?.id;

        //Hitta produkten ifrån products arrayen
        const clickedProduct = products.find(
          (product) => product.id === productId
        );

        //Om produkten finns gör detta
        if (clickedProduct) {
          // Ändra till JSON string och spara i localStorage
          const productJson = JSON.stringify(clickedProduct);
          localStorage.setItem("clickedProduct", productJson)
          
          // Öppna i product-details.html
          window.location.href = "product-details.html";
        }
      }
    }
  });
}

// SKICKA PRODUKTEN TILL VARUKORGEN //

const addToCartButtons = document.querySelectorAll(".ts-add-to-cart") as NodeListOf<HTMLElement>;

// Ett click event för knappen
if (addToCartButtons) {
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productId = button.dataset.productId as string;

      //Checka om den item som läggs till har ett ID 
      //som matchar ID:t hos item som redan finns i varukogen 
      if (productId) {
        let matchingItem = cart.find((item) => item.productId === productId);

        //Om ID matchar, utöka objektets egenskap quantity med +1
        if (matchingItem) {
          matchingItem.quantity += 1;
        } 
        //Annars, push/lägg till en ny helt ny product i vår cart/lista
        else {
          cart.push({
            productId: productId,
            quantity: 1,
          });
        }
        //Spara till localStorage 
        //och uppdatera även vaurkorgs-ikonens quantity 
        saveToStorage();
        updateCartQuantity();
      }
    });
  });
}

