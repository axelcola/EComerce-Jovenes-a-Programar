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
                                <h4 class="mb-1">` + product.name + `</h4>
                            </div>
                            <div class="col-3">
                              <input type="number" class="form-control" id="productCountInput`+i+`" onchange="calculadora(`+product.unitCost+`,`+ i +`)" placeholder="" required="" value="` + product.count + `" min="0">
                            </div>  
                        </div>
                    </div>
                </div>
        `
        document.getElementById("productsCart").innerHTML = htmlContentToAppend;
    }
}
function showCalculator(productToCart) {
    let array = productToCart.articles;
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
            let product = array[i];
            let price = product.unitCost;
            if (product.currency != "UYU") {
                price = price*40; 
            }
            htmlContentToAppend += `
            
                <div class="d-flex w-100 justify-content-between">
                    <h4 style="text-align: right"> UYU <span id="costo`+i+`" >`+price * product.count+`</span></h4>
                </div>
        `
        document.getElementById("calculator").innerHTML = htmlContentToAppend;
    }
}
function calculadora(product, i){
  let identInput = "productCountInput"+i;
  let identCosto = "costo"+i;
  let result = ""
  if (product.currency != "UYU") {
    
    result = document.getElementById(identInput).value * product * 40;
    document.getElementById(identCosto).innerHTML = result;
  }else {

    result = document.getElementById(identInput).value * product;
    document.getElementById(identCosto).innerHTML = result;
  }
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          productCart = resultObj.data

            showProductCart(productCart);
            showCalculator(productCart);}
        });
    });