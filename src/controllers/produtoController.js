const e = require("express");
const { produtoModel } = require("../models/produtoModel"); //PUXAR 

const produtoController = {
    //--------------------------------
    //controle da requisição e resposta req, res. 
    //listar todos os produtos
    //GET /produtos (rota)
    //---------------------------------

    listarProdutos: async (req, res) => {
        try {
            // const produtos = await produtoModel.buscarTodos(); //é uma função e precisa de parenteses p ser chamada
            const { idProduto } = req.query;

            if (idProduto) {
                if (idProduto.length != 36) {
                    return res.status(400).json({ erro: `id do produto inválido` })

                }
                const produto = await produtoModel.buscarUm(idProduto);


                res.status(200).json(produto);
            }

            const produtos = await produtoModel.buscarTodos();


            res.status(200).json(produtos);
        } catch (error) {
            console.error("Erro ao listar produto", error);
            res.status(500).json({ message: 'Erro AO BUSCAR PRODUTOS' });
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
    criarProduto: async (req, res) => {
        try {
            const { nomeProduto, precoProduto } = req.body;
            if (nomeProduto == undefined || nomeProduto == undefined || isNaN(precoProduto)) {
                return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos!!' })
            }

            await produtoModel.inserirProduto(nomeProduto, precoProduto);

            res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
        } catch (error) {
            console.error("Erro ao criar produto: ", error)
            res.status(500).json({ erro: 'Erro no servidor ao cadastrar produto!' })
        }
    },

    //--------------
    //Atualizar um produto
    // PUT /produtos/idProduto
    /*
    nomeProduto e precoProdutpo são opcionais
    {
        "nomeProduto" : "valor"
        "precoProduto" : 0.00
    }
    */
    //----------------

    //função de atualizar os produtos
    atualizarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params; //não precisa verificar se tem ou nao porquê assim ele já verifica a rota
            const { nomeProduto, precoProduto } = req.body;

            //pra certificar que não vão passar do numero de caracteres de um id normal
            if (idProduto.length != 36) {
                return res.status(400).json({ erro: 'id do produto inválido!' })
            }


            const produto = await produtoModel.buscarUm(idProduto);

            //verificar os id's
            if (!produto || produto.length !== 1) {
                return res.status(404).json({ error: 'Produto não encontrado!!!!!' })
            }

            //if dentro de igual é um operador ternário == verifica se o nome é nulo ou indefinido

            const produtoAtual = produto[0]; //vai receber a primeira e única posição do produto

            const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
            const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

            await produtoModel.atualizarProduto(idProduto, nomeAtualizado, precoAtualizado);

            return res.status(200).json({ message: 'Produto atualizado com sucesso' })
        } catch (error) {
            console.error("Erro ao criar produto: ", error)
            res.status(500).json({ erro: 'Erro no servidor ao atualizar o produto!' })
        }
    },
    deletarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params; //não precisa verificar se tem ou nao porquê assim ele já verifica a rota

            //pra certificar que não vão passar do numero de caracteres de um id normal
            if (idProduto.length != 36) {
                return res.status(400).json({ erro: 'id do produto inválido!' })
            }

            const produto = await produtoModel.buscarUm(idProduto);

            //verificar os id's. Se ele tiver mais de um com esse id.....
            if (!produto || produto.length !== 1) {
                return res.status(404).json({ error: 'Produto não encontrado!!!!!' })
            }

            await produtoModel.deletarProduto(idProduto);
            return res.status(200).json({ message: "Produto deletado com sucessooo!" })
        } catch (error) {
            console.error("Erro ao criar produto: ", error)
            res.status(500).json({ erro: 'Erro no servidor ao atualizar o produto!' })
        }
    }
}

module.exports = (produtoController);
