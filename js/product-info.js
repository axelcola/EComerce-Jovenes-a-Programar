var product = {};
var related = {};
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() +1 ;
let yyyy = today.getFullYear();
let hour = today.getHours();
let minute = today.getMinutes();
let second = today.getSeconds();
let currentDate = `${yyyy}-${mm}-${dd} ${hour}:${minute}:${second}`;
let starsFive =  `<span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>`
let starsFour =  `<span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star "></span>`
let starsThree = `<span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>`
let starsTwo =   `<span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>`
let starsOne =   `<span class="fa fa-star checked"></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>`
                  


function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let images = array[i];

        htmlContentToAppend += `
        <div class="col-lg-4 col-md-4 col-6">
            <a href="` + images + `">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="` + images + `" alt="">
                </div>
            </a>
        </div>
        
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}
function relatedProducts(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (i < 2){   

            htmlContentToAppend += `
            <a href="products.html" class="list-group-item list-group-item-action">
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

            document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
        }
    }
}

function showComments(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let comments = array[i];

        htmlContentToAppend += `
        
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">` + comments.user + `</h5><p style="text-align: right"> ` + comments.description + `</p>
                    <p id="commentScore">` +stars(comments.score)+ ` </p>
                </div>
                <p class="mb-1"> ` + comments.dateTime + `</p>
                
            </div>
        </div>
            
        `

        document.getElementById("comments").innerHTML = htmlContentToAppend;
        ;
    }
}
document.getElementById("enviar").addEventListener("click", comment)
function comment(){
        let user = localStorage.getItem("usuario");
        let addComment = document.getElementById("comentario").value;
        let commentRaiting = commentStars(document.getElementsByTagName("input"))
        let commentToAppend = "";
    if (addComment!= ""){    
        
            commentToAppend = `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">` + user + `</h5><p style="text-align: right"> ` + addComment + `</p>
                        <p id="commentScore">` +stars(commentRaiting)+ ` </p>
                    </div>
                    <p class="mb-1"> ` + currentDate + `</p>

                </div>
            </div>

            `
            document.getElementById("comments").innerHTML += commentToAppend;
    }
};

function commentStars (documentRaiting){
    if (documentRaiting[0].checked) {
        return 5;        
    }else if (documentRaiting[1].checked) {
        return 4;
    }else if (documentRaiting[2].checked) {
        return 3;
    }else if (documentRaiting[3].checked) {
        return 2;
    }else if (documentRaiting[4].checked) {
        return 1;        
    }

}


function stars(score){
    if(score === 5){
        return starsFive;
    }else if(score == 4){
        return starsFour;
    }else if(score === 3){
        return starsThree;
    }else if(score === 2){
        return starsTwo;
    }else{
        return starsOne;
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            //productCriteriaHTML.innerHTML = product.productCriteria;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            }
    });
});
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            related = resultObj.data;

            relatedProducts(related);
        }
    });
});



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;

            showComments(comments);
            comment();
        }
    });
});