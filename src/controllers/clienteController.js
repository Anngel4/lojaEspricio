const e = require("express");
const { clienteModel } = require("../models/clienteModel"); //PUXAR 
const { UniqueIdentifier } = require("mssql");

const clienteController = {

    //--------------------------------
    //controle da requisição e resposta req, res. 
    //listar todos os produtos
    //GET /produtos (rota)
    //---------------------------------

    listarClientes: async (req, res) => {
        try {
            const { idCliente } = req.query;

            if (idCliente) {
                if (idCliente.length != 36) {
                    return res.status(400).json({ erro: "ID do cliente inválido" })
                }

                const cliente = await clienteModel.buscarUm(idCliente)
                res.status(200).json(cliente);
            }
            
            const clientes = await clienteModel.buscarTodos(); //é uma função e precisa de parenteses p ser chamada
            res.status(200).json(clientes);
        } catch (error) {
            console.error("Erro ao listar cliente", error);
            res.status(500).json({ message: 'Erro AO BUSCAR CLIENTES' });
        }
    },
    //--------------------------------
    //CRIAR UM NOVO PRODUTO
    //POST /clientes (rota)
    /*Como vou colocar no body: (post trabalha com body e o get com query e params) 
        {
            "nomeCliente" : "valor"
            "cpfCliente" : "111.111.111-21"
        }
    */
    //---------------------------------

    criarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente } = req.body;
            if (nomeCliente == undefined || cpfCliente == undefined) {
                return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos!!' })
            }

            const result = await clienteModel.buscarCPF(cpfCliente); //esperar os resultados

            if (result.length > 0) {
                return res.status(409).json({ message: 'Este CPF já existe. ' }); //aqui ele vai ver as posções e identificar os nums do cpf
            }

            await clienteModel.inserirCliente(nomeCliente, cpfCliente);

            res.status(201).json({ message: 'Cliente cadastrado com sucesso!' })
        } catch (error) {
            console.error("Erro ao criar cliente: ", error)
            res.status(500).json({ erro: 'Erro no servidor ao cadastrar cliente!' })
        }
    }
}

module.exports = (clienteController);
