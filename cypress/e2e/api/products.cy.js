import { createUserData } from '../../support/factories/userFactory'
import { createProductData } from '../../support/factories/productFactory'

describe('API - Produtos', () => {

  it('Deve cadastrar um produto com sucesso', () => {

    cy.fixture('users').then((users) => {
      cy.fixture('products').then((products) => {

        const user = createUserData(users.admin)
        const product = createProductData(products.defaultProduct)

        // Cria usuário administrador
        cy.request({
          method: 'POST',
          url: `${Cypress.expose('apiUrl')}/usuarios`,
          body: user
        }).then((userResponse) => {

          expect(userResponse.status).to.eq(201)
          expect(userResponse.body.message)
            .to.eq('Cadastro realizado com sucesso')

          expect(userResponse.body)
            .to.have.property('_id')

          // Realiza login para obter o token
          cy.request({
            method: 'POST',
            url: `${Cypress.expose('apiUrl')}/login`,
            body: {
              email: user.email,
              password: user.password
            }
          }).then((loginResponse) => {

            expect(loginResponse.status).to.eq(200)

            expect(loginResponse.body)
              .to.have.property('authorization')

            expect(loginResponse.body.authorization)
              .to.be.a('string')
              .and.not.be.empty

            const token = loginResponse.body.authorization

            // Cadastra produto
            cy.request({
              method: 'POST',
              url: `${Cypress.expose('apiUrl')}/produtos`,
              headers: {
                authorization: token
              },
              body: product
            }).then((productResponse) => {

              // Valida status HTTP
              expect(productResponse.status).to.eq(201)

              // Valida contrato da resposta
              expect(productResponse.body).to.have.all.keys(
                'message',
                '_id'
              )

              // Valida mensagem
              expect(productResponse.body.message)
                .to.eq('Cadastro realizado com sucesso')

              // Valida ID gerado
              expect(productResponse.body._id)
                .to.be.a('string')
                .and.not.be.empty
            })
          })
        })
      })
    })
  })


  it('Deve consultar um produto por ID com sucesso', () => {

    cy.fixture('users').then((users) => {
      cy.fixture('products').then((products) => {

        const user = createUserData(users.admin)
        const product = createProductData(products.defaultProduct)

        // Cria usuário administrador
        cy.request({
          method: 'POST',
          url: `${Cypress.expose('apiUrl')}/usuarios`,
          body: user
        }).then((userResponse) => {

          expect(userResponse.status).to.eq(201)

          // Realiza login
          cy.request({
            method: 'POST',
            url: `${Cypress.expose('apiUrl')}/login`,
            body: {
              email: user.email,
              password: user.password
            }
          }).then((loginResponse) => {

            expect(loginResponse.status).to.eq(200)

            expect(loginResponse.body.authorization)
              .to.be.a('string')
              .and.not.be.empty

            const token = loginResponse.body.authorization

            // Cadastra produto para preparar a massa
            cy.request({
              method: 'POST',
              url: `${Cypress.expose('apiUrl')}/produtos`,
              headers: {
                authorization: token
              },
              body: product
            }).then((productResponse) => {

              expect(productResponse.status).to.eq(201)

              expect(productResponse.body._id)
                .to.be.a('string')
                .and.not.be.empty

              const productId = productResponse.body._id

              // Consulta produto pelo ID
              cy.request({
                method: 'GET',
                url: `${Cypress.expose('apiUrl')}/produtos/${productId}`
              }).then((getResponse) => {

                // Valida status HTTP
                expect(getResponse.status).to.eq(200)

                // Valida contrato da resposta
                expect(getResponse.body).to.have.all.keys(
                  'nome',
                  'preco',
                  'descricao',
                  'quantidade',
                  '_id'
                )

                // Valida tipos
                expect(getResponse.body.nome)
                  .to.be.a('string')

                expect(getResponse.body.preco)
                  .to.be.a('number')

                expect(getResponse.body.descricao)
                  .to.be.a('string')

                expect(getResponse.body.quantidade)
                  .to.be.a('number')

                expect(getResponse.body._id)
                  .to.be.a('string')
                  .and.not.be.empty

                // Valida integridade dos dados persistidos
                expect(getResponse.body.nome)
                  .to.eq(product.nome)

                expect(getResponse.body.preco)
                  .to.eq(product.preco)

                expect(getResponse.body.descricao)
                  .to.eq(product.descricao)

                expect(getResponse.body.quantidade)
                  .to.eq(product.quantidade)

                expect(getResponse.body._id)
                  .to.eq(productId)
              })
            })
          })
        })
      })
    })
  })

})