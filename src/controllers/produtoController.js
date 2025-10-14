const e = require("express");
const { produtoModel } = require("../models/produtoModel"); //PUXAR 

const produtoController = {
    //--------------------------------
    //controle da requisição e resposta req, res. 
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
    },
    //--------------------------------
    //CRIAR UM NOVO PRODUTO
    //POST /produtos (rota)
    /*Como vou colocar no body: (post trabalha com body e o get com query e params) 
        {
            "nomeProduto" : "valor"
            "precoProduto" : 0.00
        }
    */
    //---------------------------------
        criarProduto: async (req,  res)=> {
            try {
                const {nomeProduto, precoProduto} = req.body;
                if (nomeProduto == undefined || nomeProduto == undefined|| isNaN (precoProduto)){
                    return res.status(400).json({erro: 'Campos obrigatórios não preenchidos!!'})
                }

                await produtoModel.inserirProduto(nomeProduto, precoProduto);

                res.status(201).json({message:'Produto cadastrado com sucesso!'})
            } catch (error) {
                console.error("Erro ao criar produto: ", error)
                res.status(500).json({erro: 'Erro no servidor ao cadastrar produto!'}) 
            }
        }
}

module.exports = (produtoController);
