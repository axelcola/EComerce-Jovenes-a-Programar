//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function showProductCart(product) {

      let htmlContentToAppend = "";
      for (let i = 0; i < currentProductArray.length; i++) {

              htmlContentToAppend += `
              <a href="product-info.html" class="list-group-item list-group-item-action">
                  <div class="list-group-item list-group-item-action">
                      <div class="row">
                          <div class="col-3">
                              <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                          </div>
                          <div class="col">
                              <div class="d-flex w-100 justify-content-between">
                                  <h4 class="mb-1">` + product.name + `</h4><h4 style="text-align: right"> ` + product.currency + ` ` + product.cost + ` </h4>
                              </div>
                              <p class="mb-1"> ` + product.description + `</p> 
                              <small class="text-muted">` + product.soldCount + `artículos</small>
                          </div>
                      </div>
                  </div>
              </a>
          `
          document.getElementById("listaDeProductos").innerHTML = htmlContentToAppend;
      }
  }












  document.addEventListener("DOMContentLoaded", function (e) {
      getJSONData(CART_INFO_URL).then(function (resultObj) {
          if (resultObj.status === "ok") {
            productCart = resultObj.data

              showProductCart(productCart);}
          });
      });