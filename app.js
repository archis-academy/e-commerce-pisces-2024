const kutuKutu = document.querySelector(".category-list");

kutuKutu.addEventListener("mouseenter", () => {
  kutuKutu.style.backgroundColor = "red";
});

kutuKutu.addEventListener("mouseleave", () => {
  kutuKutu.style.backgroundColor = "white";
  
});
