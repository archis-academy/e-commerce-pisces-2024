function searchValue() {
  let loginSearchBtn = document.getElementById("mySearch").value;

  console.log(loginSearchBtn);
}

function userValue() {
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;
  

  let realEmail = "archis@email.com";
  let realPassword = "archis123";

  if (email === realEmail && password === realPassword) {
    alert("Giriş başarılı");
    window.location.href = "index.html";
  } else {
    let errorUserText = document.getElementsByClassName("error-user-data")[0];
    errorUserText.style.display = "block";
  }
}
