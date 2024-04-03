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

let flashSalesCarousel = document.querySelector("#jsdeneme");

let allProducts = [];

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  allProducts = data;
  renderTodays();
}

getProducts();

let todaysPrevQuatro = 0;
let todaysAfterQuatro = 4;

const cardNextArrow = document.querySelector("#card-next-arrow");
const cardPrevArrow = document.querySelector("#card-prev-arrow");

cardPrevArrow.addEventListener("click", () => {
  todaysAfterQuatro -= 4;
  todaysPrevQuatro -= 4;
  if (todaysAfterQuatro >= allProducts.indexOf(0)) {
    todaysPrevQuatro = 0;
    todaysAfterQuatro = 4;
  }
  renderTodays();
});

cardNextArrow.addEventListener("click", () => {
  todaysAfterQuatro += 4;
  todaysPrevQuatro += 4;
  if (todaysAfterQuatro >= allProducts.length) {
    todaysPrevQuatro = 0;
    todaysAfterQuatro = 4;
  }
  renderTodays();
});

function renderTodays() {
  const flashSaleSlideProduct = allProducts.slice(
    todaysPrevQuatro,
    todaysAfterQuatro
  );
  const flashSalesOnList = flashSaleSlideProduct
    .map((product) => {
      return `
      <div class="card-for-products">
        <div class="products-img-container">
            <p class="card-discount-rate">-40%</p>
          <img src= ${product.image} alt= ${product.title}
          class="red-gamepad-img">
          <div class="products-ispect-box">
          <button 
          onclick="addToWishList('${product.id}',
           '${product.title}')">
      <i id="kalp-foto" class="fa-regular fa-heart"></i>
          </button> 
          <button> <i class="fa-regular fa-eye"></i></i>
          </button>            
          </div>
          <div class=products-add-cart> <button> ADD TO CART </button> </div>
        </div>
        <h4> ${product.title}</h4>
        <p class="gamepad-new-price">${(
          product.price -
          (product.price * 50) / 100
        ).toFixed(2)}
        <span class="gamepad-old-price"><s>${product.price}</s></span></p>
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

  flashSalesCarousel.innerHTML = flashSalesOnList;
}

// function addToWishList(productsTitle) {
//   console.log(`ürün "${productsTitle}" eklendi`);
// // } else {
// //   console.log(`ürün "${productsTitle}" zaten ekli`);
// // }

// function addToWishList(productId) {
// addToWishList(`ürün "${product.id}" eklendi `);
// console.log(`ürün "${product.id}" eklendi `);

// if (products.id === products.id) {
//   console.log("ürün eklenmedi");
// } else {
//   console.log("ürün eklendi")
// }
// }

// function addToWishList(productId) {
//   const wishListProducts =
//     JSON.parse(localStorage.getItem("wishListProducts")) || [];

//   const isWishListed = wishListProducts.some(
//     (product) => product.id === productId
//   );

//   if (!isWishListed) {
//     const productToAdd = allProducts.find(
//       (product) => product.id === productId
//     );
//     localStorage.setItem(
//       "wishListProducts",
//       JSON.stringify([...wishListProducts, productToAdd])
//     );
//     console.log("ürün eklendi");
//   } else {
//     alert("bu ürün zate favorinizde");
//   }
// }

function addToWishList(productId) {
  const wishListProducts =
    JSON.parse(localStorage.getItem("wishListProducts")) || [];

  const isWishListed = wishListProducts.some(
    (product) => product.id === productId
  );

  if (!isWishListed) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );

    localStorage.setItem(
      "wishListProducts",
      JSON.stringify([...wishListProducts, productToAdd])
    );
  } else {
    alert("Bu ürün zaten favorilerinizde");
  }
}
