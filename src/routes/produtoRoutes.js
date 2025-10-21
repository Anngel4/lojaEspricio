const express  = require("express")
const router = express.Router(); //a rota so eh acessada se a middleway permitir
const {} = require("../controllers/produtoController");
const produtoController = require("../controllers/produtoController");
//controla as rotas, q chama os models e chama controller.



//GET /PRODUTOS -> Lista todos os produtos
router.get("/produtos", produtoController.listarProdutos);
//acessar a barra produtos, os produtos vao ser controlados e ai vai listar cada um

//POST /produtos -> Cria um novo produto
router.post("/produtos", produtoController.criarProduto);

//PUT /produtos/idProduto -> Atualizar um produto
router.put("/produtos/:idProduto", produtoController.atualizarProduto); //rotas com path parameter

//DELETE /produtos/idProduto -> Deletar um produto
router.delete("/produtos/:idProduto", produtoController.deletarProduto);

module.exports = {produtoRoutes: router};