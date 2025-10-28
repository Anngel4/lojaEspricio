const express  = require("express")
const router = express.Router(); //a rota so eh acessada se a middleway permitir
const clienteController = require("../controllers/clienteController");

//controla as rotas, q chama os models e chama controller.


//GET /PRODUTOS -> Lista todos os produtos
router.get("/clientes", clienteController.listarClientes);
//acessar a barra produtos, os produtos vao ser controlados e ai vai listar cada um

//POST /produtos -> Cria um novo produto
router.post("/clientes", clienteController.criarCliente);

module.exports = {clienteRoutes: router};