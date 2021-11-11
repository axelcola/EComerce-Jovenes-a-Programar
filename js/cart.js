//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let datosTarjeta = {}
let arrayCart = [];
let suma
let productSuma
function showProductCart(productToCart) {
    let array = productToCart.articles;
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend += `
            
                <div id="productInCart`+i+`" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + product.src + `" alt="` + product.name + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">` + product.name + `</h4>
                            </div>
                            <div class="col-3">
                              <input type="number" class="form-control" id="productCostInput`+ i + `" onchange="calculadora(` + product.unitCost + `,` + i + `)" placeholder="" required="" value="` + product.count + `" min="0">
                            </div>  
                            <h4 type="button" class="text-right" onclick="deleteProduct('productInCart${i}', 'productForCalc${i}', ${product.unitCost} , ${product.currency==="USD" })"><i class="fas fa-trash-alt"></i></h4>
                        </div>
                    </div>
                </div>
        `
        document.getElementById("productsCart").innerHTML = htmlContentToAppend;
    }
}


function deleteProduct(idProduct, idCalc, price, currency){
    document.getElementById(idProduct).remove();
    document.getElementById(idCalc).remove();
    if (currency){
        suma = suma - price*40;
        subtotal(); 
    }else suma = suma - price ;
        subtotal();} 

function showCalculator(productToCart) {
    let array = productToCart.articles;
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        let price = product.unitCost;
        if (product.currency != "UYU") {
            price = price * 40;
        }
        htmlContentToAppend += `
            
                <div id="productForCalc`+i+`" class="d-flex w-100 justify-content-between">
                    <h5 style="text-align: right"> UYU <span class="itemCalculadora" id="costo`+ i + `" >` + price * product.count + `</span></h5><p class="mr-5">` + product.name + `</p>
                </div>
        `
        document.getElementById("calculatorItems").innerHTML = htmlContentToAppend;
        subtotal();
    }
}
function metEnvio() {
    let envioradio = "";
    productSuma = 0;
    let htmlContentToAppend = "";
    if (document.getElementById("goldradio").checked) {
        envioradio = "<h5>Envío: Gold (15%)</h5>";
        envioNumero = 0.15;
        productSuma = suma;
        productSuma = suma + (suma * envioNumero);
    } else if (document.getElementById("premiumradio").checked) {
        envioradio = "<h5>Envío: Premium (7%)</h5>";
        envioNumero = 0.07;
        productSuma = suma;
        productSuma = suma + (suma * envioNumero);
    } else if (document.getElementById("standardradio").checked) {
        envioradio = "<h5> Envío: Estandard (5%)</h5>";
        envioNumero = 0.05;
        productSuma = suma;
        productSuma = suma + (suma * envioNumero);
    }
    htmlContentToAppend = `
            <div class="d-flex w-100 justify-content-end mr-5">
                <p class="mr-2">total</p><h4 style="text-align: right"> UYU <span>`+ productSuma + `</span></h4>
            </div>    
    `
    document.getElementById("total").innerHTML = htmlContentToAppend;
    document.getElementById("envio").innerHTML = envioradio;
}
function calculadora(costo, i) {
    let identInput = "productCostInput" + i;
    let identCosto = "costo" + i;
    let result = ""
    if (arrayCart[i].currency != "UYU") {

        result = document.getElementById(identInput).value * costo * 40;
        document.getElementById(identCosto).innerHTML = result;
    } else {

        result = document.getElementById(identInput).value * costo;
        document.getElementById(identCosto).innerHTML = result;
    }
    subtotal();
}
function subtotal() {
    let items = document.getElementsByClassName("itemCalculadora");
    suma = 0;
    let htmlContentToAppend = "";
    for (let index = 0; index < items.length; index++) {
        const numero = items[index];
        suma += parseInt(numero.innerHTML);
    }
    htmlContentToAppend += `
                <div class="d-flex w-100 justify-content-end mr-5">
                    <p class="mr-2">subtotal</p><h4 style="text-align: right"> UYU <span>`+ suma + `</span></h4>
                </div> 
        `
    document.getElementById("subtotal").innerHTML = htmlContentToAppend;
    metEnvio()
}

function setFormaDePago() {
    datosTarjeta.titular = document.getElementById("titular").value;
    datosTarjeta.ci = document.getElementById("ci").value;
    datosTarjeta.tarjeta = document.getElementById("numeroDeTarjeta").value;
    datosTarjeta.codigo = document.getElementById("codigoDeSeguridad").value;
    datosTarjeta.mesExpiracion = document.getElementById("mesExpiracion").value;
    datosTarjeta.anoExpiracion = document.getElementById("anoExpiracion").value;
    datosTarjeta.direccion = document.getElementById("direccion").value;
    datosTarjeta.esquina = document.getElementById("esquina").value;
    datosTarjeta.barrio = document.getElementById("barrio").value;
    datosTarjeta.departamento = document.getElementById("departamento").value;
    console.log(datosTarjeta);
    localStorage.setItem("tarjetaUsuario", JSON.stringify(datosTarjeta));
}

function getFormaDePago() {
    datosTarjeta = JSON.parse(localStorage.getItem("tarjetaUsuario"));

    document.getElementById("titular").value = datosTarjeta.titular;
    document.getElementById("ci").value = datosTarjeta.ci;
    document.getElementById("numeroDeTarjeta").value = datosTarjeta.tarjeta;
    document.getElementById("mesExpiracion").value = datosTarjeta.mesExpiracion;
    document.getElementById("anoExpiracion").value = datosTarjeta.anoExpiracion;
    document.getElementById("direccion").value = datosTarjeta.direccion;
    document.getElementById("esquina").value = datosTarjeta.esquina;
    document.getElementById("barrio").value = datosTarjeta.barrio;
    document.getElementById("departamento").value = datosTarjeta.departamento;

    console.log(datosTarjeta);
}
function finalizarCompra(){
    if (document.getElementById("titular").value == "" ||
    document.getElementById("ci").value == "" ||
    document.getElementById("numeroDeTarjeta").value == "" ||
    document.getElementById("mesExpiracion").value == 0 ||
    document.getElementById("anoExpiracion").value == 00 ||
    document.getElementById("direccion").value == "" ||
    document.getElementById("esquina").value == "" ||
    document.getElementById("barrio").value == "" ||
    document.getElementById("departamento").value == 0
    ) { alert ("Debes completar todos los campos");
    }else {location.href = "gracias.html";
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productCart = resultObj.data
            arrayCart = resultObj.data.articles;
            showProductCart(productCart);
            showCalculator(productCart);
            if (localStorage.tarjetaUsuario === undefined) {
                setFormaDePago();
          }else {getFormaDePago()};
        }
    });
});