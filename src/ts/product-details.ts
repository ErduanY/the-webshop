import "./../scss/style.scss";

//Hämta sparade produkterna från localStorage
const savedProductJson = localStorage.getItem("clickedProduct");

//Om produkten är sparad i localStorage, parse JSON och generera HTML
if (savedProductJson) {
  const savedProduct = JSON.parse(savedProductJson);

  const productDetailsHTML = `
  <div class="card">
    <div class="product-imgs">
      <img src="${savedProduct.image}">
    </div>
    <!-- Add other product details dynamically -->
    <div class="product-content">
      <h2 class="product-title">${savedProduct.name}</h2>
      <div class="product-rating">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star-half-alt"></i>
        <span>4.7(21)</span>
      </div>
      <div class="product-price">
        <p class="new-price">Pris ${savedProduct.price} kr</p>
      </div>
      <div class="product-detail">
        <h2>Om:</h2>
        <span>Size: One Size Fits All</span>
        <p>Imagine a sneaker so versatile it's practically the chameleon of footwear. This wonder is crafted with a stretchy, breathable material that molds to your foot like a custom-made glove. Its sleek design effortlessly transitions from casual strolls to active pursuits, while the cushioned sole ensures comfort is never compromised.</p>
        
        <p>Whether you're hitting the gym, exploring the city, or just chilling, this sneaker has got your back. It's the Swiss Army knife of shoes!</p>
      </div>
      <div class="purchase-info">
        <input type="number" min="0" value="1">
        <button type="button" class="btn">
          Add to Cart <i class="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  </div>`;

  const productContainer = document.querySelector(".ts-card-wrapper");
  if (productContainer) {
    productContainer.innerHTML = productDetailsHTML;
  }



  //Ta bort produkten från localStorage
  localStorage.removeItem("clickedProduct");
} 
