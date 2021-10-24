let datos = {}
function setDatos() {
      datos.nombre = document.getElementById("nombre").value;
      datos.apellido = document.getElementById("apellido").value;
      datos.edad = document.getElementById("edad").value;
      datos.contacto = document.getElementById("contacto").value;
      datos.email = document.getElementById("email").value;
      // datos.foto = document.getElementById("foto").value;
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
            //  document.getElementById("foto").value = datos.foto;
            
      console.log(datos);
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
      if (localStorage.datosUsuario === undefined) {
            setDatos();
      }else {getDatos()};
      
});