# Brain Agriculture API

## Descrição
A Brain Agriculture API é uma aplicação para registrar produtores e suas respectivas culturas. Utiliza o Node.js, Express e TypeORM para gerenciar os dados.

## Pré-requisitos
- Node.js
- npm (gerenciador de pacotes do Node.js)
- Docker
- Docker Compose

## Instalação
1. **Clone o repositório:**

   ```bash
    git clone https://github.com/thiagoribb/brain-agriculture.git
2. **Navegue até o diretório do projeto:**
   ```bash
    cd brain-agriculture
3. **Instale as dependências:**
   ```bash
    npm install

4. **Inicie os contêineres Docker:**
   ```bash
    docker-compose up -d
4. **Rodar as migrations e seeds:**
   ```bash
    npm run typeorm migration:run
5. **Execute o servidor em modo de desenvolvimento:**
   ```bash
    npm run dev

## Documentação da API

Após iniciar o projeto, você pode explorar a documentação da API para obter informações detalhadas sobre os endpoints disponíveis. Siga as instruções abaixo para acessar a documentação:

1. Certifique-se de que o projeto esteja em execução.

2. Abra o navegador e vá para [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

3. A documentação Swagger será exibida, fornecendo uma visão interativa dos endpoints, parâmetros e respostas da API.

Explore e experimente os endpoints diretamente na documentação para entender melhor como usar a API.

## Uso

Acesse a API em http://localhost:3000/api/producer para interagir com os produtores.


## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
