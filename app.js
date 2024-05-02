// GENEL ÜRÜNLERİ ALDIĞIMIZ YER BAŞLANGICI

let allProducts = [];

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  allProducts = data;
  renderTodays();
  exploreProduct();
}

getProducts();

// GENEL ÜRÜNLERİ ALDIĞIMIZ YER SONU

// Esat/[TO-2]Homepage-Todays-product-start
let istenilenSure = 43200;
let toplamSaniye = istenilenSure * 60;
let sayacElement = document.querySelector(".products-discount-countdown");
let productDiscountDay = document.querySelector(".gun");
let productDiscountHrs = document.querySelector(".saat");
let productDiscountMin = document.querySelector(".dakika");
let productDiscountSec = document.querySelector(".saniye");

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

let flashSalesCarousel = document.querySelector(".ProductsSliderJS");

let todaysPrevQuatro = 0;
let todaysAfterQuatro = 4;

const cardNextArrow = document.querySelector(".card-next-arrow");
const cardPrevArrow = document.querySelector(".card-prev-arrow");

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
                <span>(${product.rating.count})</span>
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

// Esat/E-3/Homepage-By-Category START
const categoriesBox = document.querySelectorAll(".category-list");

categoriesBox.forEach((categories) => {
  categories.addEventListener("mouseenter", () => {
    const categoriesPaths = categories.querySelectorAll(".category-svg-path");
    const categoriesTitle = categories.querySelectorAll(
      ".slider-category-name"
    );

    if (categoriesPaths) {
      categoriesPaths.forEach((path) => {
        path.style.stroke = "white";
      });
    }
    if (categoriesTitle) {
      categoriesTitle.forEach((categoryTitle) => {
        categoryTitle.style.color = "white";
      });
    }

    categories.style.backgroundColor = "rgba(219, 68, 68, 1)";
  });

  categories.addEventListener("mouseleave", () => {
    const categoriesPaths = categories.querySelectorAll(".category-svg-path");
    const categoriesTitle = categories.querySelectorAll(
      ".slider-category-name"
    );

    if (categoriesPaths) {
      categoriesPaths.forEach((path) => {
        path.style.stroke = "black";
      });
    }
    if (categoriesTitle) {
      categoriesTitle.forEach((categoryTitle) => {
        categoryTitle.style.color = "black";
      });
    }
    categories.style.backgroundColor = "white";
  });
});
// Esat/E-3/Homepage-By-Category END

// Esat/E-6/Homepage-Explore-Products Start

let explorePrevQuatro = 0;
let exploreAfterQuatro = 8;

const exploreNextArrow = document.querySelector(".explore-btn-right");
const explorePrevArrow = document.querySelector(".explore-btn-left");

explorePrevArrow.addEventListener("click", () => {
  exploreAfterQuatro -= 8;
  explorePrevQuatro -= 8;
  if (exploreAfterQuatro >= allProducts.indexOf(0)) {
    explorePrevQuatro = 0;
    exploreAfterQuatro = 8;
  }
  exploreProduct();
});

exploreNextArrow.addEventListener("click", () => {
  exploreAfterQuatro += 8;
  explorePrevQuatro += 8;
  if (exploreAfterQuatro >= allProducts.length) {
    explorePrevQuatro = 0;
    exploreAfterQuatro = 8;
  }
  exploreProduct();
});

function exploreProduct() {
  const exploreProductSlider = document.querySelector(
    ".explore-products-slider"
  );
  const exploreProducts = allProducts.slice(
    explorePrevQuatro,
    exploreAfterQuatro
  );

  const exploreProductsHTML = exploreProducts
    .map((product) => {
      return `
      <div class="card-for-products">
      <div class="products-img-container">
          
        <img src= ${product.image} alt= ${product.title}
        class="flash-product-img-${product.id}" id="flash-product-img">
        <div class="products-ispect-box">
        <button 
        onclick="addToWishlist(${product.id})">
        <i id="heart-icon-${product.id}" class="fa-regular fa-heart"></i>
        </button> 
        <button onclick="addToCartlist(${product.id})"> <i class="fa-solid fa-cart-shopping"></i>
        </button>            
        </div>
        <div class=products-add-cart> <button onclick="addToCartlist(${product.id})"> ADD TO CART </button> </div>
      </div>
      <h4> ${product.title}</h4>
    
      <span class="explore-product-old-price">$${product.price}</span></p>
      <div class="star-for-product">
              <img src="./images/star-for-vote.png" alt="">
              <img src="./images/star-for-vote.png" alt="">
              <img src="./images/star-for-vote.png" alt="">
              <img src="./images/star-for-vote.png" alt="">
              <img src="./images/star-for-vote.png" alt="">
              <span>(${product.rating.count})</span>
      </div>
    </div>
      `;
    })
    .join("");

  exploreProductSlider.innerHTML = exploreProductsHTML;
}

// Esat/E-6/Homepage-Explore-Products End
