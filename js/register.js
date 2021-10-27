document.getElementById("button").addEventListener("click", myFunction);
function myFunction() {

  if (document.getElementById("user").value!= "" && document.getElementById("pass").value!="")
  {
    localStorage.setItem("usuario", document.getElementById("user").value);
    location.href = "home.html";

  }
  else {
    alert("Debe copletar todos los campos");
  }
 
}
