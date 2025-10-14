const sql = require("mssql"); //início do codigo


//criar constante de configuração, eh tipo o arquivos.json q vc coloa as informações da tabela
const config = {
    user: 'sa', //no caso eh o administrador porque foi o unico que deu certo
    password: '123456789',//senha
    server: 'localhost', //onde está rodando
    database: 'LojaDB', //nome do banco de dados q eu coloquei pelo sql server


    //opcoes de conexoes abaixo q devem ser dentro de chaves
    options: {
        encrypt : true,
        trustServerCertificate: true
    }
} 
//funções assincrona: que nega a sincronia entre as coisas, ou seja, executadas ao mesmo tempo


//a cada ação, criar uma conexão
async function getConnection() {
    try {
        const pool = await sql.connect(config); //passar pra função connect novas conexões
        return pool; //retornar o resultado
    } catch (error) { 
        console.error("Erro na conexão do SQL Server", error);
    }    
}

//testar e aparecer o resultado no terminal(oq ta no console log vai aparecer no teminal)
//await é pra wait..... they dont love you like i love
// (async () => {
//     const teste = await getConnection();
    
//     if (teste){
//         console.log ("Conexão bem sucedida");
//     }

// })()

module.exports = {sql, getConnection}; //para exportar vamos chamar esses ai