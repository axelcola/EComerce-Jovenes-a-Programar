const CATEGORIES_URL = "http://localhost:3000/categoriesUrl";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/publishProduct";
const CATEGORY_INFO_URL = "http://localhost:3000/categoryInfoUrl";
const PRODUCTS_URL = "http://localhost:3000/productsUrl";
const PRODUCT_INFO_URL = "http://localhost:3000/productInfoUrl";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/productCommentsUrl";
// const CART_INFO_URL = "http://localhost:3000/singlecartInfoUrl";
const CART_INFO_URL = "http://localhost:3000/cartInfoUrl";
const CART_BUY_URL = "http://localhost:3000/buyMessage";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}
function onSignIn(googleUser) {
  
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
  localStorage.setItem("usuario", profile.getName());
  // location.href = "home.html";
}
function lock(){
  if ( location.pathname != "/index.html" && localStorage.getItem("usuario") === null) {
    location.href = "index.html";
  }
}

function cerrarSesion(){
  localStorage.clear();

  let auth = gapi.auth2.getAuthInstance();
  auth.signOut()
}
function showUser() {
  let user = localStorage.getItem("usuario");
  let htmlContentToAppend = user;
  document.getElementById("nav").innerHTML += htmlContentToAppend;
}
showUser();
;


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {+
  lock();

});