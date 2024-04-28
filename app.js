
// Esat/E-3/Homepage-By-Category START
const categoriesBox = document.querySelectorAll(".category-list");

categoriesBox.forEach((categories) => {
  categories.addEventListener("mouseenter", () => {
    const categoriesPaths = categories.querySelectorAll(".category-svg-path");
    const categoriesTitle = categories.querySelectorAll(".slider-category-name");

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
    const categoriesTitle = categories.querySelectorAll(".slider-category-name");

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