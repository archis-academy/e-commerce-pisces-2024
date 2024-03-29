let istenilenSure = 43200;
let toplamSaniye = istenilenSure * 60;
let sayacElement = document.querySelector("#sayac-container");
let productDiscountDay = document.querySelector("#gun");
let productDiscountHrs = document.querySelector("#saat");
let productDiscountMin = document.querySelector("#dakika");
let productDiscountSec = document.querySelector("#saniye");

let sayacBaslat = setInterval(() => {
  if (toplamSaniye <= 0) {
    clearInterval(sayacBaslat);
    sayacElement.innerHTML = "İndirim bitti";
  } else {
    toplamSaniye--;

    const gun = Math.floor(toplamSaniye / 3600 / 24);
    const saat = Math.floor(toplamSaniye / 3600) % 24;
    const dakika = Math.floor(toplamSaniye / 60) % 60;
    const saniye = Math.floor(toplamSaniye % 60);

    productDiscountDay.innerHTML = `${format(gun)}`;
    productDiscountHrs.innerHTML = `${format(saat)}`;
    productDiscountMin.innerHTML = `${format(dakika)}`;
    productDiscountSec.innerHTML = `${format(saniye)}`;
  }
}, 1000);

function format(pm) {
  return pm < 10 ? `0${pm}` : pm;
}

let denemeDivi = document.querySelector("#jsdeneme");

let allProducts = [];

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  allProducts = data;
  renderTodays();
}

getProducts();

function renderTodays() {
  const flashSaleSlideProduct = allProducts.slice(0,12);
  const yazDostumBunlara = flashSaleSlideProduct
    .map((products) => {
      return `
      <div class="card-for-products">
        <div class="products-img-container">
            <p class="card-discount-rate">-40%</p>
          <img src= ${products.image} alt= ${products.title}
          class="red-gamepad-img">
          <div class="products-ispect-box">
            <img src="./images/wishlist-icon.svg" alt="">
            <img src="./images/icon-eye.svg" alt="">
          </div>
        </div>
        <h4> ${products.title}</h4>
        <p class="gamepad-new-price">${products.price}<span class="gamepad-old-price"><s>${products.price}</s></span></p>
        <div class="star-for-product">
                <img src="./images/star-for-vote.png" alt="">
                <img src="./images/star-for-vote.png" alt="">
                <img src="./images/star-for-vote.png" alt="">
                <img src="./images/star-for-vote.png" alt="">
                <img src="./images/star-for-vote.png" alt="">
                <span>(88)</span>
        </div>
      </div>
    `;
    })
    .join("");

  denemeDivi.innerHTML = yazDostumBunlara;
}
