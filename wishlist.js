let allProducts = [];

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  allProducts = data;
  renderTodays();
}

getProducts();

const wishlistContainer = document.querySelector("#wishlistPageContainer");

function renderWishlistProducts() {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];

  wishlistContainer.innerHTML = wishlistProducts
    .map((product) => {
      return `
      
       <div class="productsInWishlist">
        <div class="ProdcutImageContainer">
        <button onclick="deleteWishlistProduct(${product.id})"><i class="fa-solid fa-trash"></i></button>
        <img src= ${product.image}>
          
          <p class="addToCartBtn" onclick="addToCartlist(${product.id})"><i class="fa-solid fa-cart-shopping"></i> Add To Cart</p>
        </div>
        <div class="productBilgiListesi">
        <h4 class="ProductsTitleinWishlist">${product.title}</h4>

        <p class="ProductPriceinWishlist">${product.price}</p>
        </div>
      </div> `;
    })
    .join("");
}

renderWishlistProducts();

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
