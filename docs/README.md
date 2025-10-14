<!-- md= MarkDown -->
## API Reference 



<!-- documentação de rota por rota
- tópico
** negrito -->
<!-- ``` -> Para criar um bloco de código -->

### Produtos
#### GET /produtos
- **Descrição**: Obtém uma lista de produtos 
- *Responde*: Uma array de produtos

### Produtos
#### POST /produtos
- **Descrição**: Cria um novo produto
- **Body**: 
```
{
    "nomeProduto":  "produtoExample",
    "precoProduto": 00.0
}
```

**Response**:
```
{
    "message": "Produto cadastrado com sucesso!"
}
```




### Clientes
#### GET /clientes
- **Descrição**: Obtém uma lista de clientes 
- *Responde*: Uma array de clientes

### Clientes
#### POST /clientes
- **Descrição**: Cria um novo cliente
- **Body**: 
```
{
    "nomeCliente":  "clienteExample",
    "cpfCliente": "000.000.000.00"
}
```

**Response**:
```
{
    "message": "Cliente cadastrado com sucesso!"
}
```
