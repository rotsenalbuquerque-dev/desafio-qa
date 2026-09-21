# Desafio QA - Automação ServeRest

Projeto de automação de testes desenvolvido como parte do **Desafio Técnico de QA**, utilizando **Cypress + JavaScript**.

O projeto contempla testes automatizados de **Frontend (E2E)** e **API**, utilizando a aplicação ServeRest como ambiente de testes.

## Tecnologias

- JavaScript
- Cypress
- Node.js
- ServeRest
- Git / GitHub

## Aplicações utilizadas

**Frontend**

https://front.serverest.dev/

**API / Swagger**

https://serverest.dev/

---

## Estrutura do projeto

```text
cypress/
├── e2e/
│   ├── frontend/
│   │   ├── login.cy.js
│   │   └── cadastro.cy.js
│   │
│   └── api/
│       ├── products.cy.js
│       └── login.cy.js
│
├── fixtures/
│   ├── users.json
│   └── products.json
│
├── pages/
│   ├── LoginPage.js
│   └── RegisterPage.js
│
└── support/
    ├── factories/
    │   ├── userFactory.js
    │   └── productFactory.js
    │
    ├── commands.js
    └── e2e.js

cypress.config.js
package.json
README.md
```

## Cenários automatizados

### Frontend

#### Login com credenciais válidas

Valida que um usuário previamente criado consegue realizar login pela interface da aplicação.

A criação do usuário é realizada via API como preparação da massa de teste, enquanto a funcionalidade de login é validada através do Frontend.

#### Login com credenciais inválidas

Valida o comportamento da aplicação ao tentar autenticar utilizando credenciais inválidas.

É validada a mensagem:

```text
Email e/ou senha inválidos
```

#### Cadastro de usuário

Valida o cadastro de um novo usuário através da interface da aplicação.

Os dados são gerados dinamicamente para evitar conflitos entre diferentes execuções.

### API

#### Cadastro de produto

Valida a criação de um novo produto através do endpoint de produtos.

São realizadas validações de:

- Status HTTP;
- Mensagem retornada;
- Contrato da resposta;
- Geração do identificador do produto.

#### Consulta de produto por ID

Valida a consulta do produto criado anteriormente através de seu identificador.

São realizadas validações de:

- Status HTTP;
- Estrutura da resposta;
- Tipos dos atributos;
- ID do produto;
- Nome;
- Preço;
- Descrição;
- Quantidade;
- Integridade dos dados persistidos.

#### Cenário negativo de autenticação

Valida o comportamento da API ao tentar realizar autenticação utilizando credenciais inválidas.

---

## Arquitetura e boas práticas

O projeto utiliza algumas estratégias para melhorar organização, legibilidade e manutenção dos testes.

### Page Object

As interações com as páginas do Frontend são encapsuladas em Page Objects.

Exemplo:

```javascript
LoginPage.login(user.email, user.password)
```

Isso evita duplicação de seletores e mantém os testes focados no comportamento esperado.

### Fixtures

As fixtures armazenam dados base utilizados pelos testes:

```text
cypress/fixtures/users.json
cypress/fixtures/products.json
```

### Factories

Factories são utilizadas para gerar dados dinâmicos durante a execução.

Exemplo:

```javascript
const user = createUserData(users.admin)
```

Isso permite executar os testes múltiplas vezes sem conflito com usuários ou produtos previamente cadastrados.

### Preparação de massa via API

Nos cenários de Frontend, quando necessário, a API é utilizada somente para preparação das pré-condições.

Por exemplo:

```text
Criar usuário via API
        ↓
Acessar Frontend
        ↓
Realizar login pela interface
        ↓
Validar resultado
```

Dessa forma, o teste permanece focado na funcionalidade que realmente está sendo validada.

### Seletores

Sempre que disponível, são utilizados atributos `data-testid`.

Exemplo:

```javascript
cy.get('[data-testid="email"]')
```

Isso reduz a dependência de classes CSS e torna os testes menos suscetíveis a alterações visuais da aplicação.

---

## Pré-requisitos

Para executar o projeto é necessário possuir:

- Node.js
- npm
- Git

Para verificar as versões instaladas:

```bash
node --version
npm --version
git --version
```

---

## Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Acesse o diretório:

```bash
cd desafio-qa-ambev
```

Instale as dependências:

```bash
npm install
```

---

## Executando os testes

### Cypress em modo interativo

```bash
npx cypress open
```

Selecione **E2E Testing** e escolha o navegador desejado.

### Executar todos os testes

```bash
npx cypress run
```

### Executar somente os testes de Frontend

```bash
npx cypress run --spec "cypress/e2e/frontend/**/*.cy.js"
```

### Executar somente os testes de API

```bash
npx cypress run --spec "cypress/e2e/api/**/*.cy.js"
```

### Executar testes específicos de produtos

```bash
npx cypress run --spec "cypress/e2e/api/products.cy.js"
```

---

## Configuração dos ambientes

As URLs utilizadas pelos testes são configuradas no `cypress.config.js`.

```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',

    setupNodeEvents(on, config) {
      // Eventos do Node podem ser configurados aqui
    },
  },

  expose: {
    apiUrl: 'https://serverest.dev'
  }
})
```

Dessa forma:

```javascript
cy.visit('/login')
```

utiliza o Frontend configurado como `baseUrl`.

Para chamadas da API:

```javascript
Cypress.expose('apiUrl')
```

é utilizado como endereço base da ServeRest.

---

## Estratégia de testes

Os cenários foram definidos buscando cobrir diferentes aspectos da aplicação:

- Happy paths;
- Cenários negativos;
- Autenticação;
- Cadastro;
- Manipulação de produtos;
- Validação de contrato de API;
- Validação de persistência dos dados.

A automação também busca manter independência entre os testes através da criação dinâmica das massas necessárias para cada cenário.

---

## Autor

**Rotsen Albuquerque**

Projeto desenvolvido para desafio técnico de QA.