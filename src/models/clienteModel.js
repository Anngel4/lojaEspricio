const { UniqueIdentifier, Char } = require("mssql");
const { sql, getConnection } = require("../config/db") //primeira coisa a fazer

//modelo dos dados do banco de dados
//criar objeto de funções: ler, criar, atualizar, deletar -crud-
const clienteModel = {
    //async pq pd demorar
    buscarTodos: async () => {
        try {
            const pool = await getConnection(); //criar conexão com o bd

            //obter nossa consulta no banco de dados, q tipo q vai ser
            let sql = 'SELECT * FROM clientes';

            //armazenar resultadossss
            const result = await pool.request().query(sql)

            return result.recordset;
        } catch (error) {
            console.log("Erro ao buscar clientes..", error); //cada erro é personaloizado
            throw error; //passa o erro pro controller tratar 
        }
    },
    buscarCPF: async (cpfCliente) => {
        try {

            const pool = await getConnection(); // criar a conexão com banco de dados

            const querySQL = 'SELECT * FROM clientes WHERE cpfCliente = @cpfCliente'; //selecionar entre todos se o cpf é igual à algum cpf existente.

            const result = await pool.request() //
                .input('cpfCliente', sql.Char(14), cpfCliente)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            throw error; // passar a resposta para o controller
        }
    },
    // inserir os valores(insert into... values..)
    inserirCliente: async (nomeCliente, cpfCliente) => {
        try {
            const pool = await getConnection();

            let querySQL = 'INSERT INTO clientes(nomeCliente, cpfCliente) VALUES (@nomeCliente, @cpfCliente)';//passa o valor pra values sabe


            await pool.request()

                .input('nomeCliente', sql.VarChar(100), nomeCliente)
                //cria, add o tipo, resultado oferecido
                //sql.varchar é pra saber se estao sendo passados corretamente e o tipo de dado
                //INPUT é a caixinha com valor dentro

                .input('cpfCliente', sql.UniqueIdentifier, cpfCliente)
                .query(querySQL)

        } catch (error) {
            console.log("Erro ao inserir novos clientes..", error);
            throw error; //passar resposta
        }

    }
}

// async function teste() {
//     const produtos = await produtoModel.buscarTodos();

//     console.log(produtos);
// }

// teste();

module.exports = { clienteModel }