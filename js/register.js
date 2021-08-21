document.getElementById("button").addEventListener("click", myFunction);
function myFunction() {

  if (document.getElementById("user").value!= "" && document.getElementById("pass").value!=""){
    location.href = "Home.html";
  }
  else {
    alert("Debe copletar todos los campos");
  }
 
}