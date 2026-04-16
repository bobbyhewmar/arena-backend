# Arena Backend

Backend em **Node.js + TypeScript** para um servidor de Lineage II, focado em duas frentes que impactam o produto:
- **Onboarding de jogadores** com criação de conta validada e hash compatível com o ecossistema do jogo.
- **Engajamento competitivo** com ranking paginado, pesquisável e filtrável.

## Leitura em 30 segundos
- **Problema:** servidores de MMORPG precisam integrar cadastro e ranking sem comprometer segurança, performance e compatibilidade com legado.
- **Solução:** API HTTP em camadas (`controller -> service -> repository`) com validação de entrada, regras de domínio e acesso a MySQL via Prisma.
- **Valor de produto:** reduz friccao no cadastro e aumenta retenção ao expor leaderboard dinâmico para o frontend.
- **Stack:** `Express`, `Prisma`, `Zod`, `hash-wasm`, `TypeScript`.

## Problema e Solucao
- **Problema 1:** cadastro de conta exige validação forte e hash compatível com diferentes padrões de autenticação do servidor.
- **Solucao 1:** endpoint de criação com validação (`Zod` + regex), verificação de duplicidade (login/email) e hash configurável por ambiente.
- **Problema 2:** ranking com filtros dinâmicos costuma ficar caro e difícil de paginar.
- **Solucao 2:** endpoint de ranking com filtro controlado por allowlist, paginação, busca por nome e retorno formatado para consumo direto no frontend.

## Funcionalidades
- `POST /auth/create-account`
- Validação de `username`, `email` e `password` antes de persistir.
- Verificação de duplicidade de conta por login e email.
- Hash de senha configurável: `md5`, `sha1`, `whirlpool`, `sha3-256`.
- `GET /ranking/get`
- Ranking com filtros: `pvpkills`, `pkkills`, `raidkills`, `oly_wins`, `arena_wins`.
- Busca por `char_name`, paginação (`page`, `limit`) e metadados (`totalPlayers`, `totalPages`, `allowedFilters`).

## Arquitetura
```text
HTTP (Express Routes)
   -> Controllers (entrada/saida HTTP)
      -> Services (regras de negocio)
         -> Repositories (acesso a dados)
            -> Prisma Client / SQL (MySQL)
```

### Estrutura de pastas
```text
.
|- controllers/
|- services/
|- repositories/
|- routes/
|- lib/           # singleton PrismaClient
|- utils/         # hash de senha
|- prisma/        # datasource + client Prisma
|- types/
|- index.ts
`- package.json
```

## Decisoes tecnicas
- **Arquitetura em camadas:** separa responsabilidade de transporte HTTP, regras de negocio e persistencia; facilita manutencao e testes.
- **Zod na borda da API:** entradas invalidas sao rejeitadas cedo, reduzindo erro de negocio e sujeira no banco.
- **Prisma com tipagem + SQL controlado:** usa ORM para operacoes padrao e consulta SQL para ranking ordenado por filtro dinamico, com allowlist para mitigar risco de injecao.
- **Hash configuravel por ambiente:** permite compatibilidade com diferentes esquemas de autenticacao do servidor sem alterar codigo.
- **Prisma singleton em dev:** evita excesso de conexoes durante hot reload.

## Como rodar
### Pre-requisitos
- Node.js `22+`
- MySQL acessivel

### 1) Instalar dependencias
```bash
npm install
```

### 2) Configurar ambiente
Crie um `.env` na raiz com:

```env
DATABASE="mysql://USER:PASS@IP:PORT/DATABASE"
EXTERNAL_PORT=4001
PASSWORD_ENCRYPTION_METHOD=sha1
```

Valores aceitos em `PASSWORD_ENCRYPTION_METHOD`: `md5`, `sha1`, `whirlpool`, `sha3-256`.

### 3) Preparar Prisma
```bash
npx prisma db pull
npx prisma generate
```

### 4) Desenvolvimento
```bash
npm run dev
```
API em `http://localhost:4001` (ou porta definida em `EXTERNAL_PORT`).

### 5) Producao
```bash
npm run build
npm run start
```

## Possiveis melhorias
- Adicionar autenticacao com JWT e rate limit para hardening de seguranca.
- Introduzir testes automatizados (unitarios para services e integracao para rotas criticas).
- Criar observabilidade minima (logs estruturados, metricas e healthcheck).
- Versionar API e padronizar respostas de erro.
- Substituir `$queryRawUnsafe` por construcao SQL segura quando viavel.

## Comandos uteis
| Comando | Descricao |
|---|---|
| `npm run dev` | Sobe ambiente de desenvolvimento |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm run start` | Executa build em modo producao |
