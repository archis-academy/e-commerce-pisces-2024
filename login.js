function searchValue() {
  let loginSearchBtn = document.getElementById("mySearch").value;

  console.log(loginSearchBtn);
}

function userValue() {
  var email = document.getElementById("emailInput").value;
  var password = document.getElementById("passwordInput").value;
  

  var realEmail = "archis@email.com";
  var realPassword = "archis123";

  if (email === realEmail && password === realPassword) {
    alert("Giriş başarılı");
    window.location.href = "index.html";
  } else {
    var errorUserText = document.getElementsByClassName("error-user-data")[0];
    errorUserText.style.display = "block";
  }
}
