const {sql, getConnection} = require("../config/db") //primeira coisa a fazer

//criar objeto de funções: ler, criar, atualizar, deletar -crud-
const produtoModel = {
    //async pq pd demorar
    buscarTodos: async()=> {
        try {
            const pool = await getConnection(); //criar conexão com o bd

            //obter nossa consulta no banco de dados, q tipo q vai ser
            let sql = 'SELECT * FROM Produtos';

            //armazenar resultadossss
            const result = await pool.request().query(sql)

            return result.recordset;
        } catch (error) {
            console.log("Erro ao buscar produtos..", error); //cada erro é personaloizado
            throw error; //jogar o erro pro controller tratar tlg
        }
    }
}

// async function teste() {
//     const produtos = await produtoModel.buscarTodos();
    
//     console.log(produtos);
// }

// teste();

module.exports = {produtoModel}