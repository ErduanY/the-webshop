import {cart} from "./main";
import {getProduct} from "./models/products";

//Funktion för space mellan 4:e nummer i cardNmbr input
function cardSpace(event: Event) {
  const cardInput = event.target as HTMLInputElement;
  const cardDigit = cardInput.value;

  if (
    cardDigit.length === 4 ||
    cardDigit.length === 9 ||
    cardDigit.length === 14
  ) {
    cardInput.value = cardDigit + " ";
  }
}

const cardNmbrInput = document.getElementById("cardNmbr") as HTMLInputElement;

if (cardNmbrInput) {
  cardNmbrInput.addEventListener("input", cardSpace);
}

//Funktion för slash efter två nummer i validTill input
function cardSlash(event: Event) {
  const inputEvent = event as InputEvent;
  const expireDate = inputEvent.target as HTMLInputElement;
  const expireInput = expireDate.value;

  if (
    expireInput.length === 2 &&
    inputEvent.inputType !== "deleteContentBackward"
  ) {
    expireDate.value = expireInput + "/";
    expireDate.maxLength = 5;
  }
}

const expireInput = document.getElementById("validTill") as HTMLInputElement;

if (expireInput) {
  expireInput.addEventListener("input", cardSlash);
}

//Tillbaka till startsida från kassan
const cancelButton = document.querySelector(
  ".checkoutCloseBtn"
) as HTMLButtonElement | null;
if (cancelButton) {
  cancelButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

//Återandvädner paymenSummery, men ändrar paymentSummaryHTML
function checkoutPaymentSummary() {
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
  
        <div class="checkout-payment-summary-row total-row">
          <h3 class="cart-total-title">Summa:</h3>
          <span class="payment-summary-money">${totalPrice} SEK</span>
        </div>
    `;

  const paymentSummaryElement = document.querySelector(".ts-payment-summary");
  if (paymentSummaryElement) {
    paymentSummaryElement.innerHTML = paymentSummaryHTML;
  } 
}
checkoutPaymentSummary();

//Event för att "slutför köp", rensar localStorage och visar en alert som bekräftar din betalning.
//Kan inte slutföra köp om inte inputs är ifyllda
document.addEventListener("DOMContentLoaded", () => {
  const checkoutForm = document.getElementById(
    "checkoutForm"
  ) as HTMLFormElement | null;

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = checkoutForm.querySelector(
        "#name"
      ) as HTMLInputElement | null;
      if (nameInput && nameInput.value.trim() === "") {
        return;
      }

      const cardNumberInput = checkoutForm.querySelector(
        "#cardNmbr"
      ) as HTMLInputElement | null;
      if (cardNumberInput) {
        //Tar bort mellanslag
        const cardNumberValue = cardNumberInput.value.replace(/\s/g, "");

        // Kollar om kortnummer är siffror
        if (cardNumberValue === "" || !/^\d+$/.test(cardNumberValue)) {
          alert("Kortnummer får endast innehålla siffror.");
          return;
        }

        // Kollar om kortnummer är 16 siffror
        if (cardNumberValue.length !== 16) {
          alert("Kortnummer måste vara 16 siffror");
          return;
        }
      }

      const validTillInput = checkoutForm.querySelector(
        "#validTill"
      ) as HTMLInputElement | null;
      if (validTillInput && validTillInput.value.trim() === "") {
        return;
      }

      const cvvInput = checkoutForm.querySelector(
        "#cvv"
      ) as HTMLInputElement | null;
      if (cvvInput && cvvInput.value.trim() === "") {
        return;
      }

      localStorage.clear();
      alert("Tack för ditt köp!");
      window.location.href = "index.html";
    });
  }
});
