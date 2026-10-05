# Sistema de Chamados

Trabalho da disciplina de DevOps.

O projeto é um sistema simples para listar e cadastrar chamados. Ele possui uma API em NestJS, um front em React e um banco PostgreSQL. Os serviços serão executados com Docker Compose.

## Alunos

- Diogo Leonardo Arcênio
- Luis Henrique Serafim Silvano

## Sumário

- [Estrutura do projeto](#estrutura-do-projeto)
- [Requisitos](#requisitos)
- [Como executar](#como-executar)
- [Acessos](#acessos)
- [Banco PostgreSQL](#banco-postgresql)
- [Tabela tickets](#tabela-tickets)
- [Endpoints CRUD](#endpoints-crud)
- [Exemplos de resposta](#exemplos-de-resposta)
- [Como encerrar e limpar](#como-encerrar-e-limpar)

## Estrutura do projeto

```text
prova-devops/
├── api/       # API NestJS
├── front/     # Front React
└── deploy/    # Docker Compose
```

## Requisitos

Para executar o projeto:

- Git
- Docker Desktop
- Docker Compose

Para desenvolver ou alterar o projeto localmente:

- Node.js 24
- npm

A execução pelos containers precisa apenas do Git e do Docker Desktop com Docker Compose.

## Como executar

Clonar o repositório:

```cmd
git clone https://github.com/DiogoArcenioo/prova-devops.git prova-devops
```

Entrar na pasta do Compose:

```cmd
cd prova-devops\deploy
```

Subir os containers:

```cmd
docker compose up -d --build
```

Verificar os containers:

```cmd
docker compose ps
```

Ver os logs da API:

```cmd
docker compose logs api
```

## Acessos

- Front: http://localhost:8080
- API: http://localhost:3000/tickets
- Swagger: http://localhost:3000/docs
- PostgreSQL: `localhost:5433`

O PostgreSQL e a API estão ligados pela rede `db-network`. O front e a API estão ligados pela rede `app-network`. Assim, o front não acessa o banco diretamente. O Nginx do front encaminha as requisições de `/api/tickets` para o serviço `api`.

## Banco PostgreSQL

Para iniciar somente o PostgreSQL:

```cmd
docker compose up -d postgres
```

Para encerrar preservando os dados:

```cmd
docker compose down
```

Para encerrar e apagar também o volume do banco:

```cmd
docker compose down -v
```

O PostgreSQL pode ser acessado em `localhost:5433`. Os dados ficam armazenados no volume `postgres_data`.

## Tabela tickets

A tabela `tickets` possui os seguintes campos:

| Campo | Descrição |
| --- | --- |
| id | Identificador do chamado |
| code | Código do chamado |
| subject | Assunto do chamado |
| description | Descrição do problema |
| priority | Prioridade do chamado |

As prioridades usadas serão `baixa`, `media` e `alta`.

## Endpoints CRUD

| Método | Rota | Função |
| --- | --- | --- |
| GET | `/tickets` | Lista todos os chamados |
| GET | `/tickets/:id` | Busca um chamado pelo ID |
| POST | `/tickets` | Cria um chamado |
| PATCH | `/tickets/:id` | Atualiza um chamado |
| DELETE | `/tickets/:id` | Exclui um chamado |

## Exemplos de resposta

Exemplo para criar um chamado:

```json
{
  "code": "CH-001",
  "subject": "Erro no sistema",
  "description": "Não foi possível acessar o sistema.",
  "priority": "alta"
}
```

Exemplo de resposta:

```json
{
  "id": 1,
  "code": "CH-001",
  "subject": "Erro no sistema",
  "description": "Não foi possível acessar o sistema.",
  "priority": "alta"
}
```

Exemplo para atualizar a prioridade:

```json
{
  "priority": "media"
}
```

## Como encerrar e limpar

Parar e remover os containers e as redes:

```cmd
docker compose down
```

Parar e remover também o volume do PostgreSQL:

```cmd
docker compose down -v
```

O volume é usado para manter os dados do PostgreSQL mesmo quando os containers são removidos. O comando com `-v` também apaga esses dados.
