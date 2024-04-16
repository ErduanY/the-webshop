import {Shoe} from "./Shoe";

export function getProduct(productID: any) {
  let matchingProduct: Shoe | undefined;

  products.forEach((product) => {
    if (product.id === productID) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

export const products: Shoe[] = [
  new Shoe("/media-library/img/mater3_300x.avif", "C1", "Classic Clog", "Crocs", 1999),
  new Shoe("/media-library/img/airforce1.avif", "N1", "Air Force 1", "Nike", 1599),
  new Shoe("/media-library/img/jordan4.avif", "N2", "Air Jordan 4", "Nike", 4999),
  new Shoe("/media-library/img/jordan1.avif", "N3", "Air Jordan 1", "Nike", 3199),
  new Shoe("/media-library/img/dunklow.avif", "A1", "Dunk Low", "adidas", 2699),
  new Shoe("/media-library/img/campus00.avif", "A2", "Campus 00s", "adidas", 2399),
  new Shoe("/media-library/img/yeezyBoost.avif", "A3", "Yeezy Boost 350", "adidas", 5499),
  new Shoe("/media-library/img/yeezySlide.avif", "A4", "Yeezy Slide", "adidas", 4999),
  new Shoe("/media-library/img/newbalance.avif", "A5", "550 UNC", "New Balance", 2799),
  new Shoe("/media-library/img/newbalance2.avif", "A6", "550 White Burgundy", "New Balance", 2699),
];
