// const kutuKutu = document.querySelectorAll(".category-list");

// kutuKutu.addEventListener("mouseenter", (event) => {
//   const path = event.target.querySelector(".category-svg-path");

//   if (path) {
//     path.style.stroke = "white";
//   }
// });

// console.log(kutuKutu);

// const kutuKutu = document.querySelectorAll(".category-list");

// kutuKutu.forEach(kutu => {
//   kutu.addEventListener("mouseenter", (event) => {
//     const path = event.target.querySelector(".category-svg-path");

//     if (path) {
//       path.style.stroke = "white";
//       path.style.line.stroke = "white";
//     }
//   });
// });

// const kutuKutu = document.querySelectorAll(".category-list");

// kutuKutu.forEach((kutu) => {
//   kutu.addEventListener("mouseenter", (event) => {
//     const paths = event.currentTarget.querySelectorAll(".category-svg-path");
//     const metoText = event.currentTarget.querySelectorAll(".slider-category-name");
//     if (paths) {
//       paths.forEach((path) => {
//         path.style.stroke = "white";
//       });
//     }
//     if (metoText) {
//       metoText.forEach((metoText) => {
//         metoText.style = "white";
//       });
//     }

//     kutu.style.backgroundColor = "red";
//   });
//   kutu.addEventListener("mouseleave", (event) => {
//     const paths = event.currentTarget.querySelectorAll(".category-svg-path");
//     if (paths) {
//       paths.forEach((path) => {
//         path.style.stroke = "black";
//       });
//     }
//     event.currentTarget.style.backgroundColor = "white";
//   });
// });

const kutuKutu = document.querySelectorAll(".category-list");

kutuKutu.forEach((kutu) => {
  kutu.addEventListener("mouseenter", (event) => {
    const paths = kutu.querySelectorAll(".category-svg-path");
    const metoTexts = kutu.querySelectorAll(".slider-category-name");

    if (paths) {
      paths.forEach((path) => {
        path.style.stroke = "white";
      });
    }
    if (metoTexts) {
      metoTexts.forEach((metoText) => {
        metoText.style.color = "white";
      });
    }

    kutu.style.backgroundColor = "red";
  });

  kutu.addEventListener("mouseleave", (event) => {
    const paths = kutu.querySelectorAll(".category-svg-path");
    const metoTexts = kutu.querySelectorAll(".slider-category-name");

    if (paths) {
      paths.forEach((path) => {
        path.style.stroke = "black";
      });
    }
    if (metoTexts) {
      metoTexts.forEach((metoText) => {
        metoText.style.color = "black";
      });
    }
    kutu.style.backgroundColor = "white";
  });
});
