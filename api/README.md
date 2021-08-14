# ⌛️ API Node - FullStack Mesha Technology Challenge

<br>

----

<br>

## 🚀 Challenge
Criar uma API de cadastro de colaboradores e funções de administrador.

## 👨🏽‍💻 Tech Stack
- Node.js
- Typescript
- Express
- MySQL

## 📝 Requisitos Funcionais
- Registrar colaborador
- Verificar colaboradores
- Ver informações do colaborador
- Validar ou não o colaborador

## 🚙 Como rodar essa aplicação
1. `git clone` para baixar o repositório;
2. `npm install && npm run start` para instalar as dependências e rodar.;
3. ` .env ` adicionar arquivo .env conforme o arquivo exemplo;

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE_NAME=
```

4. Criar tabelas conforme o arquivo 'tables.sql'.

## 🛤 Endpoints

### 🛒 Base URL: http://localhost:4000/

### 🔐 Routes

<br>

`POST /collaborator/registrar` Endpoint cadastra um colaborador.

Body(email, name, cpf, knowledge_1 are required) :
```
{

    "email": "example@g.com",
    "name": "Example", 
    "cpf": "123.456.789-99", 
    "phone": "(51) 99999-9999",
    "knowledge_1": "Git", 
    "knowledge_2": "React", 
    "knowledge_3": "Php"

}
```
<br>

`GET /collaborator` Endpoint retorna todos colaboradores cadastrados.
<br>

`GET /collaborator/:id` Endpoint retorna o colaborador com o id especificado.
<br>

`PUT /collaborator/:id/validate`  Endpoint valida o colaborador com o id especificado.
<br>

`PUT /collaborator/:id/unvalidate` Endpoint não valida o colaborador com o id especificado.

#### 👋🏽 How to reach me

Gabriel Musse | Developer FullStack | gdmusse@hotmail.com | +55-51-993967939






