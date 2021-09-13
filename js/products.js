var ProductArray = [];
const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DESC_BY_PRICE = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProduct(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductArray.length; i++) {
        let product = currentProductArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

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
        }
        document.getElementById("listaDeProductos").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProduct(sortCriteria, ProductArray) {
    currentSortCriteria = sortCriteria;

    if (ProductArray != undefined) {
        currentProductArray = ProductArray;
    }

    currentProductArray = sortProduct(currentSortCriteria, currentProductArray);

    //Muestro las categorías ordenadas
    showProductList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProduct(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProduct(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProduct(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProduct(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductList(currentProductArray);
    });
});
document.getElementById("buscador").addEventListener("input", (event) => {
    let busqueda = document.getElementById("buscador").value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductArray.length; i++) {
        let product = currentProductArray[i];

        if (product.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(busqueda.toUpperCase()) || 
        product.description.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(busqueda.toUpperCase())) {
            
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">` + product.name + `</h4><h4 style="text-align: right"> ` + product.cost + ` ` + product.currency + `  </h4>
                                <small class="text-muted">` + product.soldCount + `artículos</small>
                            </div>
                            <p class="mb-1"> ` + product.description + `</p>
                        </div>
                    </div>
                </div>
            </a>
        `
        }
        document.getElementById("listaDeProductos").innerHTML = htmlContentToAppend;
    }
})