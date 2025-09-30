const express  = require("express")
const router = express.Router(); //a rota so eh acessada se a middleway permitir
const {} = require("../controllers/produtoController");
const produtoController = require("../controllers/produtoController");

//GET /PRODUTOS -> Lista todos os produtos

router.get("/produtos", produtoController.listarProdutos);
//acessar a barra produtos, os produtos vao ser controlados e ai vai listar cada um

module.exports = {produtoRoutes: router};