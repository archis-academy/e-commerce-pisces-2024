// Esat/[TO-2]Homepage-Todays-product-start

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

let flashSalesCarousel = document.querySelector("#Products-Slider-JS");

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
          class="flash-product-img-${product.id}" id="flash-product-img">
          <div class="products-ispect-box">
          <button 
          onclick="addToWishlist(${product.id})">
          <i id="heart-icon-${product.id}" class="fa-regular fa-heart"></i>
          </button> 
          <button onclick="addToCartlist(${
            product.id
          })"> <i class="fa-solid fa-cart-shopping"></i>
          </button>            
          </div>
          <div class=products-add-cart> <button onclick="addToCartlist(${
            product.id
          })"> ADD TO CART </button> </div>
        </div>
        <h4> ${product.title}</h4>
        <p class="flash-product-new-price">${(
          product.price -
          (product.price * 50) / 100
        ).toFixed(2)}
        <span class="flash-product-old-price"><s>${product.price}</s></span></p>
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

function addToWishlist(productId) {
  const heartIcon = document.querySelector(`#heart-icon-${productId}`);

  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];

  const isWishlisted = wishlistProducts.some(
    (product) => product.id === productId
  );

  if (!isWishlisted) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );

    localStorage.setItem(
      "wishlistProducts",
      JSON.stringify([...wishlistProducts, productToAdd])
    );
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid");
  } else {
    deleteWishlistProduct(productId);
    heartIcon.classList.add("fa-regular");
    heartIcon.classList.remove("fa-solid");

  }
}

function deleteWishlistProduct(productId) {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];

  const filteredWishlistProducts = wishlistProducts.filter(
    (product) => product.id !== productId
  );

  localStorage.setItem(
    "wishlistProducts",
    JSON.stringify(filteredWishlistProducts)
  );
}





function addToCartlist(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const isOnCart = cartProducts.some((product) => product.id === productId);

  if (!isOnCart) {
    const putInCart = allProducts.find((product) => product.id === productId);

    cartProducts.push(putInCart);

    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  } else {
    deleteCartlistProducts(productId);
  }
}

function deleteCartlistProducts(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const filteredCartlistProducts = cartProducts.filter(
    (product) => product.id !== productId
  );
  localStorage.setItem(
    "cartProducts",
    JSON.stringify(filteredCartlistProducts)
  );
}

// Esat/[TO-2]Homepage-Todays-product-END
