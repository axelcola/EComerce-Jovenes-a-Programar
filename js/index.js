const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/categoriesUrl", function (req,res){
      res.sendFile(path.join(__dirname,"../JSON/category/categories.json"))     
});
app.get("/categoryInfoUrl", function (req,res){
      res.sendFile(path.join(__dirname,"../JSON/category/categoryInfo.json"))     
});
app.get("/productsUrl", function (req,res){
      res.sendFile(path.join(__dirname,"../JSON/product/all.json"))     
});
app.get("/productInfoUrl", function (req,res){
      res.sendFile(path.join(__dirname,"../JSON/product/productInfo.json"))     
});
app.get("/productCommentsUrl", function (req,res){
      res.sendFile(path.join(__dirname,"../JSON/product/comments.json"))     
});
app.get("/publishProduct", function (req,res){
      res.sendFile(path.join(__dirname,"../JSON/product/publish.json"))     
});
app.get("/cartInfoUrl", function (req,res){
      res.sendFile(path.join(__dirname,"../JSON/cart/dosProductosEnCarrito.json"))     
});
app.get("/singlecartInfoUrl", function (req,res){
      res.sendFile(path.join(__dirname,"../JSON/cart/pinoDeOlor.json"))     
});
app.get("/buyMessage", function (req,res){
      res.sendFile(path.join(__dirname,"../JSON/cart/buy.json"))     
});

app.listen(3000, function(){
      console.log("manso el ganso");
});