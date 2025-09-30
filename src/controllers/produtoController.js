const e = require("express");
const { produtoModel } = require("../models/produtoModel"); //PUXAR 

const produtoController = {
    //--------------------------------
    //listar todos os produtos
    //GET /produtos (rota)
    //---------------------------------

    listarProdutos: async (req, res)=> {
        try {
            const produtos = await produtoModel.buscarTodos(); //é uma função e precisa de parenteses p ser chamada

            res.status(200).json(produtos);
        } catch (error) {
            console.error("Erro ao listar produto", error);
            res.status(500).json({message: 'Erro AO BUSCAR PRODUTOS'});
        }
    }
}

module.exports = (produtoController);
