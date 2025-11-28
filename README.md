# idroove_backend

API REST para uma concessionária de carros construída com Node.js, Express e Prisma.

Banco de dados:
- MySQL local
- Schema: `idroove_db`

Instalação e execução
----------------------

1. Instale dependências:

```bash
npm install
```

2. Gere o Prisma Client e rode as migrations:

```bash
npm run generate
npm run migrate
```

3. Inicie o servidor em modo dev:

```bash
npm run dev
```

Endpoints principais
-------------------

- GET /api/vehicles - lista todos os veículos
- GET /api/vehicles/:id - busca veículo por ID
- POST /api/vehicles - cria um veículo
- PUT /api/vehicles/:id - atualiza um veículo
- DELETE /api/vehicles/:id - exclui um veículo

Exemplos de uso (curl)
----------------------

- Listar veículos:

```bash
curl -sS http://localhost:3333/api/vehicles
```

- Buscar por ID:

```bash
curl -sS http://localhost:3333/api/vehicles/1
```

- Criar veículo:

```bash
curl -sS -X POST http://localhost:3333/api/vehicles \
	-H 'Content-Type: application/json' \
	-d '{"placa":"XYZ0A12","renavam":"98765432109","ano":2020,"marca":"Honda","modelo":"Civic","categoria":"SEDAN","cor":"Preto","portas":4,"motorizacao":"2.0","tipoCambio":"AUTOMATIC","direcao":"ELECTRIC","kilometragem":20000,"situacaoLicenciamento":"REGULAR","situacaoVeiculo":"AVAILABLE"}'
```

- Atualizar veículo (PUT):

```bash
curl -sS -X PUT http://localhost:3333/api/vehicles/1 \
	-H 'Content-Type: application/json' \
	-d '{"cor":"Vermelho","kilometragem":25000}'
```

- Excluir veículo:

```bash
curl -sS -X DELETE http://localhost:3333/api/vehicles/1
```

Exemplo de payload (POST /api/vehicles):

```json
{
	"placa": "ABC1D23",
	"renavam": "12345678901",
	"ano": 2021,
	"marca": "Toyota",
	"modelo": "Corolla",
	"categoria": "SEDAN",
	"cor": "Prata",
	"portas": 4,
	"motorizacao": "1.8 16V",
	"tipoCambio": "AUTOMATIC",
	"direcao": "ELECTRIC",
	"kilometragem": 15000,
	"situacaoLicenciamento": "REGULAR",
	"situacaoVeiculo": "AVAILABLE"
}
```

Observações
-----------

- Campos obrigatórios: `placa`, `renavam`, `ano`, `marca`, `modelo`, `categoria`, `cor`, `portas`, `motorizacao`, `tipoCambio`, `direcao`, `kilometragem`, `situacaoLicenciamento`, `situacaoVeiculo`.

Banco local com Docker
----------------------

Para evitar problemas com configurações locais, você pode subir um container MySQL compatível com as credenciais de exemplo:

```bash
docker-compose up -d
```

Depois de subir, verifique e crie as migrations:

```bash
npm run generate
npm run migrate
npm run seed
```

Verifique se a conexão está ok:

```bash
npm run check-db
```

Se não quiser usar Docker, certifique-se de que o MySQL local esteja rodando e que as credenciais em `.env` estejam corretas.

Erros comuns
------------
- Erros P1000 do Prisma significam falha na autenticação com o DB: verifique as credenciais, se o banco está rodando e se o usuário tem permissões.
- Erros P2002 significam violações de UNIQUE (placa/renavam) e resultam em 409 Conflict.

Comandos úteis
---------------
- Subir DB via Docker: `npm run compose:up`
- Parar DB via Docker: `npm run compose:down`
- Rodar checagem de conexão com DB: `npm run check-db`
- Rodar migrations: `npm run migrate`
- Popular DB com seed: `npm run seed`
- As enums válidas estão definidas com os nomes mostrados no schema Prisma.

