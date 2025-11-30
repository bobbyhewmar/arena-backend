# 🚀 L2 Arena backend

Este projeto é o frontend oficial do **L2 Arena**, desenvolvido em **Nuxt 3**, utilizando TailwindCSS, Strapi, Pinia, Turnstile, Meta Pixel e diversas integrações essenciais para alto desempenho e SEO.

---

## 📦 Tecnologias Principais

- **NodeJS 22+**
- **Express**
- **Hash-wasm**
- **Zod**

---

# 🔧 Instalação

Clone o repositório e instale as dependências:

```bash
git clone git@github.com:bobbyhewmar/arena-backend.git
cd backend/
npm install
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```
DATABASE = "mysql://USER:PASS@IP:PORT/DATABASE"
EXTERNAL_PORT = 4001
PASSWORD_ENCRYPTION_METHOD = sha1  # choice between md5, sha1, whirlpool, sha3-256

```
---

# 🧪 Gerando prisma.schema

O schema do banco de dados é gerado a partir do comando:

```bash
npx prisma db pull
npx prisma generate
```

---

# 🧪 Ambiente de Desenvolvimento

Inicie o servidor local:

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:4001
```

---

# 🏭 Build de Produção

Gerar build otimizado:

```bash
npm run build
```

Iniciar servidor de produção:

```bash
npm run start
```

---

# 🔥 Deploy com PM2 (Produção)

Instalar o PM2:

```bash
npm install -g pm2
```

Iniciar o projeto:

```bash
pm2 start 'npm run start' --name backend
```

Salvar estado e configurar startup automático:

```bash
pm2 save
pm2 startup
```

---

# 📁 Estrutura do Projeto

```
.
├── controllers/
├── lib/
├── prisma/
├── repositories/
├── routes/
├── services/
├── types/
├── utils/
├── utils/
├── package.json
├── index.ts
├── tsconfig.json
├── .gitignore
└── .env-example
```

---

# 🛠 Comandos Úteis

| Comando | Descrição |
|--------|-----------|
| npm run dev | Ambiente de desenvolvimento |
| npm run build | Build de produção |
| npm run start | Testar build local |
| pm2 restart backend | Reiniciar app |
| pm2 logs backend | Ver logs |
| pm2 stop backend | Parar app |

---

# 🤝 Contribuição

Pull requests são bem-vindos.  
Para grandes mudanças, abra uma issue antes para discutirmos.

---

# 📄 Licença

Projeto privado. Todos os direitos reservados.
