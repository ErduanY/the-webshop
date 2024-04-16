import {cart} from "./main";
import {getProduct} from "./models/products";

export function renderPaymentSummary() {
  let productPrice = 0;
  let shippingPrice = 39;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPrice += product!.price * cartItem.quantity;
  });

  const totalPrice = productPrice + shippingPrice;

  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const paymentSummaryHTML = `
      <h2 class="cart-summary-title">Din order</h2>

      <div class="payment-summary-row">
        <p>Produkter: <span class="payment-summary-quantity">${cartQuantity}</span></p>
        <div class="payment-summary-quantity"> ${productPrice} SEK </div>
      </div>

      <div class="payment-summary-row">
        <div>Leverans:</div>
        <div class="payment-summary-quantity">39 SEK</div>
      </div>

      <div class="payment-summary-row total-row">
        <h3 class="cart-total-title">Summa: </h3>
        <span class="payment-summary-money">${totalPrice} SEK</span>
      </div>

      <button class="checkout-button">
        Fortsätt till kassa
      </button>
  `;

  const paymentSummaryElement = document.querySelector(".ts-payment-summary");
  if (paymentSummaryElement) {
    paymentSummaryElement.innerHTML = paymentSummaryHTML;

    //Öppnar checkout från varukorgen
    const checkoutButton = paymentSummaryElement.querySelector(
      ".checkout-button"
    ) as HTMLButtonElement | null;
    if (checkoutButton) {
      checkoutButton.addEventListener("click", () => {
        window.location.href = "checkout.html";
      });
    } 
  } 
}
