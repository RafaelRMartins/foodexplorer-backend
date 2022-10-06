# Projeto FoodExplorer da RocketSeat 🚀

![Banner](https://cdn.discordapp.com/attachments/974659560260399174/1027502456009150484/Capa-FoodExplorer.jpg)

## Descrição

Esse projeto foi um desafio final do curso Explorer da Rocketseat

## Como executar?

Para rodar essa aplicação faça o download do projeto, em seguida utilize o comando abaixo para baixar as dependências:

```bash
  npm install
```

Por padrão o banco de dados já vem com um usuário admin e 12 pratos cadastrados, para zerar o banco de dados apague o arquivo database.db em src/database e utilize o comando abaixo para gerar um novo banco de dados:

```bash
  npm run migrate
```

Para tornar um usuário admin basta alterar no banco de dados na tabela users admin de 0 para 1