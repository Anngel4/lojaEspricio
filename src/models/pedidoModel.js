const { sql, getConnection } = require("../config/db");

const pedidoModel = {

    /**
     * Busca todos os pedidos e seus respectivos itens no banco de dados.
     * 
     * @async
     * @function buscarTodos
     * @returns {Promise<Array>} Retorna uma lista com todos os pedidos e seus itens //Promise: promete retornar valor, seja erro ou não
     * @throws Mostra no console o erro e propaga o erro caso a busca falhe.
     */

    buscarTodos: async () => {
        try {
            const pool = await getConnection();

            const querySQL = `
            SELECT 
	            CL.nomeCliente,
	            PD.dataPedido,
        	    PD.statusPagamento,
        	    PR.nomeProduto,
        	    IT.qtdItem

            FROM Pedidos PD
	            INNER JOIN ItemPedido IT
	            ON IT.idPedido = PD.idPedido
	            INNER JOIN Produtos PR
	            ON PR.idProduto = IT.idProduto
	            INNER JOIN Clientes CL
	            ON CL.idCliente = PD.idCliente `

            const result = await pool.request()
                .query(querySQL);

            return result.recordset;
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error)
            throw error
        }
    },

    //ta em chave pois vai pegar de um obj que vai ser passado para ele
    inserirPedido: async (idCliente, dataPedido, statusPagamento, {itens}) => { 
        //{itens} realiza a desestruturação do objeto itens
        
        const pool = await getConnection();

        const transaction = new sql.Transaction(pool);
        await transaction.begin(); //Inicia a transação. "Espera ela começar"

        try {

            let querySQL = `
                INSERT INTO Pedidos(idCliente, dataPedido, statusPagamento)
                OUTPUT INSERTED.idPedido
                VALUES (@idCliente, @dataPedido, @statusPagamento)
            `
            const result = await transaction.request()
                .input("idCliente", sql.UniqueIdentifier, idCliente)
                .input("dataPedido", sql.Date, dataPedido)
                .input("statusPagamento",sql.Bit, statusPagamento)
                .query(querySQL);

            //recordset é p devolver uma lista de array, com a primeira posição, que é a 0
            const idPedido = result.recordset[0].idPedido;

            //da lista, de cada item dessa lista, cada item da lista de itens 
            for (const item of itens) {
                const {idProduto, qtdItem} = item;

                querySQL = `
                    INSERT INTO ItemPedido (idPedido, idProduto, qtdItem)
                    VALUES (@idPedido, @idProduto, @qtdItem)
                `
                await transaction.request()
                    .input("idPedido", sql.UniqueIdentifier, idPedido)
                    .input("idProduto", sql.UniqueIdentifier, idProduto)
                    .input("qtdItem", sql.Int, qtdItem)
                    .query(querySQL)
            }

            await transaction.commit();

        } catch (error) {
            await transaction.rollback(); //Desfaz tudo caso dê erro
            console.error("Erro ao inserir pedido:", error)
            throw error
        }
    }
};

module.exports = { pedidoModel };