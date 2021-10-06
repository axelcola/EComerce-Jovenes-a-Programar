//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function showProductCart(productToCart) {
      let array = productToCart.articles;
      let htmlContentToAppend = "";
      for (let i = 0; i < array.length; i++) {
              let product = array[i];
              htmlContentToAppend += `
              
                  <div class="list-group-item list-group-item-action">
                      <div class="row">
                          <div class="col-3">
                              <img src="` + product.src + `" alt="` + product.name + `" class="img-thumbnail">
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
          `
          document.getElementById("productsCart").innerHTML = htmlContentToAppend;
      }
  }

  document.addEventListener("DOMContentLoaded", function (e) {
      getJSONData(CART_INFO_URL).then(function (resultObj) {
          if (resultObj.status === "ok") {
            productCart = resultObj.data

              showProductCart(productCart);}
          });
      });