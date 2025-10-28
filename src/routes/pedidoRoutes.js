const express  = require("express");
const router = express.Router(); //a rota só é acessada se a middleway permitir
const {pedidoController} = require("../controllers/pedidoController");

/**
 * Define as rotas relacionadas aos pedidos
 * 
 * @module pedidoRoutes 
 * 
 * @description
 *  - Get /pedidos -> Lista todos pedidos do banco de dados.
 *  - Post /pedidos -> Cria um novo pedido e os seus itens com os dados enviados pelo cliente HTTP
 */
router.get("/pedidos", pedidoController.listarPedidos);
router.post("/pedidos", pedidoController.criarPedido);


module.exports = {pedidoRoutes: router};