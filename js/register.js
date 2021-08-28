document.getElementById("button").addEventListener("click", myFunction);
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
  location.href = "Home.html";
}
function myFunction() {

  if (document.getElementById("user").value!= "" && document.getElementById("pass").value!=""){
    localStorage.setItem("usuario", document.getElementById("user").value);
    location.href = "Home.html";
  }
  else {
    alert("Debe copletar todos los campos");
  }
 
}