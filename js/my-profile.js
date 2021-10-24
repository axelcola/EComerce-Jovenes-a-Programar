let datos = {}
function setDatos() {
      datos.nombre = document.getElementById("nombre").value;
      datos.apellido = document.getElementById("apellido").value;
      datos.edad = document.getElementById("edad").value;
      datos.contacto = document.getElementById("contacto").value;
      datos.email = document.getElementById("email").value;
      datos.foto = document.getElementById("profilePhoto").src;
      console.log(datos);
      localStorage.setItem("datosUsuario", JSON.stringify(datos))
      // datos= localStorage.getItem("datosUsuario")                 
}

function getDatos() {
      datos = JSON.parse(localStorage.getItem("datosUsuario"))
      
             document.getElementById("nombre").value = datos.nombre;
             document.getElementById("apellido").value = datos.apellido;
             document.getElementById("edad").value = datos.edad;
             document.getElementById("contacto").value = datos.contacto;
             document.getElementById("email").value = datos.email;
             document.getElementById("profilePhoto").src = datos.foto;
            
      console.log(datos);
}
function newPhoto() {
      var preview = document.querySelector('img');
      var file    = document.getElementById('inputPhoto').files[0];
      var reader  = new FileReader();
    
      reader.onloadend = function () {
        preview.src = reader.result;
      }
    
      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
      }
    }
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
      if (localStorage.datosUsuario === undefined) {
            setDatos();
      }else {getDatos()};
      
});