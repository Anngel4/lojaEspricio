const { sql, getConnection } = require("../config/db") //primeira coisa a fazer

//modelo dos dados do banco de dados
//criar objeto de funções: ler, criar, atualizar, deletar -crud-

const produtoModel = {
    //async pq pd demorar
    buscarTodos: async () => {
        try {
            const pool = await getConnection(); //criar conexão com o bd

            //obter nossa consulta no banco de dados, q tipo q vai ser
            let sql = 'SELECT * FROM Produtos';

            //armazenar resultadossss
            const result = await pool.request().query(sql)

            return result.recordset;
        } catch (error) {
            console.log("Erro ao buscar produtos..", error); //cada erro é personaloizado
            throw error; //passa o erro pro controller tratar tlg
        }
    },
    
    //inserir os valores(insert into... values..)
    inserirProduto: async (nomeProduto, precoProduto) => {
        try {
            const pool = await getConnection();

            let querySQL = 'INSERT INTO Produtos(nomeProduto, precoProduto) VALUES (@nomeProduto, @precoProduto)';//passa o valor pra values sabe


            await pool.request()
                .input('nomeProduto', sql.VarChar(100), nomeProduto)
                //cria, add o tipo, resultado oferecido
                //sql.varchar é pra saber se estao sendo passados corretamente e o tipo de dado
                //INPUT é a caixinha com valor dentro

                .input('precoProduto', sql.Decimal(10, 2), precoProduto)
                .query(querySQL)


        } catch (error) {
            console.log("Erro ao inserir produtos..", error);
            throw error; //nao vai enviar resposta, so vai passar
        }

    }
}

// async function teste() {
//     const produtos = await produtoModel.buscarTodos();

//     console.log(produtos);
// }

// teste();

module.exports = { produtoModel }