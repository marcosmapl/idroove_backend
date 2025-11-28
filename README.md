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
	-d '{"placa":"XYZ0A12","renavam":"98765432109","ano":2020,"marca":"Honda","modelo":"Civic","categoria":"SEDAN","cor":"Preto","portas":4,"motorizacao":"2.0","tipoCombustivel":"GASOLINA","tipoCambio":"AUTOMATIC","direcao":"ELECTRIC","kilometragem":20000,"codigoUnidade":1,"situacaoLicenciamento":"REGULAR","situacaoVeiculo":"AVAILABLE"}'
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
    "id": 20,
    "placa": "TUV0T00",
    "renavam": "21934567890",
    "ano": 2019,
    "marca": "Honda",
    "modelo": "Fit",
    "categoria": "HATCH",
    "cor": "Prata",
    "portas": 4,
    "motorizacao": "1.5",
    "tipoCombustivel": "Flex",
    "tipoCambio": "MANUAL",
    "direcao": "HYDRAULIC",
    "kilometragem": 64000,
    "codigoUnidade": 2,
    "situacaoLicenciamento": "REGULAR",
    "situacaoVeiculo": "AVAILABLE",
    "createdAt": "2025-11-28T11:14:26.000Z",
    "updatedAt": "2025-11-28T11:14:26.000Z"
}
```

Observações
-----------

- Campos obrigatórios: `placa`, `renavam`, `ano`, `marca`, `modelo`, `categoria`, `cor`, `portas`, `motorizacao`, `tipoCombustivel`, `tipoCambio`, `direcao`, `kilometragem`, `situacaoLicenciamento`, `situacaoVeiculo`, `codigoUnidade`.

- Códigos válidos para `codigoUnidade`:
	- 1 — Fortaleza
	- 2 — Manaus

Banco local com Docker
----------------------

Para evitar problemas com configurações locais, você pode subir um container MySQL compatível com as credenciais de exemplo:

```bash
docker-compose up -d
```

Depois de subir (ou garantir que o DB esteja acessível), gere o client e aplique migrations:

```bash
npm run generate
npm run migrate
npm run seed

Se você já tinha dados no banco ou a migration falhar, resetar as migrations de desenvolvimento pode ser necessário (APENAS em ambientes de desenvolvimento):

```bash
npx prisma migrate reset --force
# OU (quando se está usando Prisma CLI via npm): npm run prisma -- migrate reset --force
```

Aviso: executar `reset` apagará dados na sua base de dados; use com cautela.

Recuperando de erros de migration (P3006 / P3018 - coluna duplicada / aplicação falhada)
----------------------------------------------------------------------------------

Se você encontrar um erro de migration indicando que uma coluna já existe (por exemplo `codigo_unidade`), tente os passos abaixo, na ordem indicada:

1) Verifique se a coluna já existe no banco (substitua o nome do schema e tabela se necessário):

```bash
mysql -u root -p -e "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'idroove_db' AND TABLE_NAME = 'Vehicle' AND COLUMN_NAME = 'codigo_unidade';"
```

2) Se a coluna já existir e a migration nova apenas replicar a alteração, marque a migration como aplicada (seguro em produção quando o schema já foi alterado manualmente):

```bash
npx prisma migrate resolve --applied 20251128142000_add_codigo_unidade
```

3) Se esta for uma base de desenvolvimento (sem dados críticos), uma solução rápida é resetar o DB de migrations e reaplicar as migrations:

```bash
npx prisma migrate reset --force
npm run migrate
npm run seed
```

4) Se quiser, você pode também remover a migration redundante (depende do seu fluxo de trabalho):
	- Exclua a pasta `prisma/migrations/20251128142000_add_codigo_unidade` e então execute `npx prisma migrate dev` / `npm run migrate`.

Observação: Ao trabalhar com ambientes com dados de produção, use `prisma migrate resolve` para evitar acidentalmente apagar dados.
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

