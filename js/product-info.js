let product = {};
let related = {};
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
let hour = today.getHours();
let minute = today.getMinutes();
let second = today.getSeconds();
let currentDate = `${yyyy}-${mm}-${dd} ${hour}:${minute}:${second}`;
let starsFive = `<span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>`
let starsFour = `<span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star "></span>`
let starsThree = `<span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>`
let starsTwo = `<span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>`
let starsOne = `<span class="fa fa-star checked"></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>
                  <span class="fa fa-star "></span>`

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let images = array[i];
        
        if (i!=0){
        htmlContentToAppend += `
                <div class="carousel-item">
                    <img src="` + images + `" class="d-block w-100" alt="...">
                </div>`
        }else{
        htmlContentToAppend += `          
                <div class="carousel-item active">
                     <img src="` + images + `" class="d-block w-100" alt="...">
                </div>`
        }

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}
function relatedProducts(array,relatedArray) {

    let htmlContentToAppend = "";
        for (let i = 0; i < array.length; i++) {
            let product = array[i];
            if ( relatedArray.relatedProducts.includes(i)){

            htmlContentToAppend += `
            <div class="col-md-4 mb-5">
              <a href="products.html" class="card mb-4 shadow-sm custom-card">
                <img class="bd-placeholder-img card-img-top"  src="` + product.imgSrc + `">
                    <h3 class="m-3">` + product.name + ` (` + product.soldCount + `)</h3>
                    <h5 class="m-3"> ` + product.currency + ` ` + product.cost + `</h5>
                <div class="card-body">
                  <p class="card-text">` + product.description + `</p>
                </div>
              </a>
            </div>`
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
                    <p id="commentScore">` + stars(comments.score) + ` </p>
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
function comment() {
    let user = localStorage.getItem("usuario");
    let addComment = document.getElementById("comentario").value;
    let commentRaiting = commentStars(document.getElementsByTagName("input"))
    let commentToAppend = "";
    if (addComment != "") {

        commentToAppend = `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">` + user + `</h5><p style="text-align: right"> ` + addComment + `</p>
                        <p id="commentScore">` + stars(commentRaiting) + ` </p>
                    </div>
                    <p class="mb-1"> ` + currentDate + `</p>

                </div>
            </div>

            `
        document.getElementById("comments").innerHTML += commentToAppend;
        document.getElementById("comentario").value = "";
    }
};

function commentStars(documentRaiting) {
    if (documentRaiting[0].checked) {
        return 5;
    } else if (documentRaiting[1].checked) {
        return 4;
    } else if (documentRaiting[2].checked) {
        return 3;
    } else if (documentRaiting[3].checked) {
        return 2;
    } else if (documentRaiting[4].checked) {
        return 1;
    }

}


function stars(score) {
    if (score === 5) {
        return starsFive;
    } else if (score == 4) {
        return starsFour;
    } else if (score === 3) {
        return starsThree;
    } else if (score === 2) {
        return starsTwo;
    } else {
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

            relatedProducts(related, product);
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