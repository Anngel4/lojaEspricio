const express = require("express");
const app = express(); //criar instância do express
const {produtoRoutes} = require("./src/routes/produtoRoutes"); //importar o nosso produto routes. Usa 1 ponto pra ir direto na pasta
const PORT = 8081; 

app.use(express.json());//post ja configurado na middleway
app.use('/', produtoRoutes);

//ultima parte do codigo
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)

});

