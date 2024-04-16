import "./../scss/style.scss";
import { CartItem } from "./interfaces/ICartItems";
import { Shoe } from "./models/Shoe";
import {products} from "./models/products";
import { renderPaymentSummary } from "./paymentSummary";
import * as $ from 'jquery';

// Cart array
export let cart: CartItem[] = JSON.parse(localStorage.getItem("cart")!) || [];

// Function som sparar cart data till localStorage
export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//Uppdatera Cart Quantity i cart.html
export function updateQuantity(productId: string, newQuantity: number) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  //Räkna ut nytt antal
  matchingItem!.quantity = newQuantity;

  //Spara till localStorage
  saveToStorage();
}

//Function som uppdaterar cart quantity i UI
//Quantity är 0 by default
export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  const cartQuantityElement = document.querySelector(".ts-cart-quantity");

  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity.toString();
  }
}

// Uppdatera cart HTML
let cartHTML = '';

cart.forEach((cartItem) => {
  const productID: string = cartItem.productId!;
 
  let matchingProduct: Shoe | undefined;

  products.forEach((product) => {
    if (product.id === productID) {
      matchingProduct = product;
    }
  });

  // Checka om matchingProduct är definierad innan vi kommer åt dess egenskaper
  if (matchingProduct) {
    
    //Generera HTML för Cart Item Container
    const cartItemHTML = `
    <div class="cart-item-container
    ts-cart-item-container-${matchingProduct.id}">
    <img src="${matchingProduct.image}" alt="${matchingProduct.name}" class="cart-item__image">
    <div class="cart-item__details">
      <div class="cart-item__name">${matchingProduct.name}</div>
      <div class="cart-item__price"><span class="cart-text-bold">Pris: </span>${matchingProduct.price}<span>kr.</span></div>
      <div class="product-quantity">
            <span class="cart-text-bold">
            Antal: <span class="quantity-label ts-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary ts-update-link"
              data-product-id="${matchingProduct.id}">
              <i class='bx bxs-chevron-down'></i>
            </span>
            <input type="number" min="0" class="quantity-input ts-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary ts-save-link"
              data-product-id="${matchingProduct.id}">
              Spara
            </span>
      </div>
    </div>
  </div>
`;
    cartHTML += cartItemHTML;
  }
});

// Uppdatera cart content efter vår loop
const cartContentElement = document.querySelector('.ts-cart-content');
  if (cartContentElement) {
    cartContentElement.innerHTML = cartHTML;
  }

 // Hämta cart data från local storage när sidan laddas
 window.addEventListener("load", () => {
  const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      cart = JSON.parse(storedCart);
        updateCartQuantity();
    }
});

// Function för att uppdatera quantity 
document.querySelectorAll('.ts-update-link')
  .forEach((link) => {
    (link as HTMLElement).addEventListener('click', () => {
      const productId = (link as HTMLElement).dataset.productId;
      const container = document.querySelector(
        `.ts-cart-item-container-${productId}`
      );

      //Om användaren klickar på Update, 
      //lägg till klass is-editing-quantity som visar en inputfield
      if (container) {
        container.classList.add('is-editing-quantity');
      }
    });
  });
 
  //Spara uppdaterad quantity genom att klicka på Save
  document.querySelectorAll('.ts-save-link')
  .forEach((link) => {
    if (link instanceof HTMLElement) {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        location.reload();


        if (productId !== undefined) {
          const quantityInput = document.querySelector(
            `.ts-quantity-input-${productId}`
          ) as HTMLInputElement | null;

          //Uppdatera cart quantity när användaren skriver in i input
          if (quantityInput) {
            const newQuantity = Number(quantityInput.value); //Omvandla till tal
            updateQuantity(productId, newQuantity);

            // Ta bort podukt från varukorg när quantity ändras till 0
            if (newQuantity === 0) {
              removeFromCart(productId);
            }

            console.log(newQuantity);
            const quantityLabel = document.querySelector(
              `.ts-quantity-label-${productId}`
            );
            quantityLabel!.innerHTML = `${newQuantity}`;
     
            updateCartQuantity();
          }
        }
      });
    }
  });

// Funktionen removeFromCart, som tar bort produkten
  function removeFromCart(productId: string) {
   cart = cart.filter((item) => item.productId !== productId);
  saveToStorage();
}

//Räkna ut summan 
  renderPaymentSummary();

  //-----------JQuery för scroll function--------------//

$(document).ready(function() {
  $(".background-button").click(function() {
    const productDisplay = $(".product-display");

    if (productDisplay.length) {
      $('html, body').animate({
        scrollTop: productDisplay.offset()!.top
      }, 800);
    }
  });
});