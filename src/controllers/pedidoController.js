const { pool } = require("mssql");
const { pedidoModel } = require("../models/pedidoModel");
const { clienteModel } = require  ("../models/clienteModel")
const {produtoModel} = require ("../models/produtoModel")



const pedidoController = {
    /**
     * Controlador que lista todos os pedidos do banco de dados.
     * 
     * @async
     * @function listarPedidos
     * @param {object} req - Objeto da REQUISIÇÃO (recebido do cliente HTTP)
     * @param {object} res - Objeto da RESPOSTA (enviado ao cliente HTTP)´
     * @returns {Promise<void>} Retorna uma resposta JSON com a lista de pedidos//Void é quando alem de retornar uma resposta http com json, ela apenas envia uma resposta, nao uma array
     * @throws Mostra no console e retorna erro 500 se ocorrer falha ao buscar os pedidos
     */
    listarPedidos: async (req, res) => {
        try {
            const pedidos = await pedidoModel.buscarTodos();

            res.status(200).json(pedidos); //voltar um obj Js pedidos
        } catch (error) {
            console.log("Erro ao listar pedido:", error);
            res.status(500).json({ erro: "Erro interno no servidor ao listar pedidos!" })//sempre que abre a chave é um objeto JavaScript
        }

    },

    criarPedido: async (req, res) => {
        try {
            //itens é uma array de OBJ de javaScript
            const {idCliente, dataPedido, statusPagamento, itens} = req.body; 

            if(idCliente ==undefined || dataPedido == undefined || statusPagamento == undefined || itens.length < 1){
                return res.status(400).json({erro: `Campos obrigatório não preenchidos!`});
            }

            //ver se o idCliente é válido:
            if(idCliente.length != 36){
                return res.status(400).json({erro: "Id do cliente inválido"})
            }

            const cliente = await clienteModel.buscarUm(idCliente);

            if(!cliente || cliente.length != 1){
                return res.status(404).json({ erro: "Cliente não encontrado!"})
            }

            for (const item of itens) {
                const {idProduto, qtdItem} = item;

                if(idProduto == undefined || qtdItem == undefined){
                    return res.status(400).json({erro: "Campos obrigatórios não preenchidos!"})
                }

                if(idProduto.length != 36){
                    return res.status(400).json({erro: "Id do produto inválido"})
                }

                const produto = await produtoModel.buscarUm(idProduto);
                if (!produto || produto.length !== 1) {
                    return res.status(404).json({ erro: "Produto não encontrado!"}) 
                }
                
            }

            await pedidoModel.inserirPedido(idCliente, dataPedido, statusPagamento, {itens});

            res.status(201).json({message: "Pedido cadastrado com sucesso!!"})

        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            res.status(500).json({erro: "Erro interno no servidor ao cadastrar pedido!"});
        }
    }


}

module.exports = { pedidoController }