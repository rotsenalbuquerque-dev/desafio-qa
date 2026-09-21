import LoginPage from '../../pages/LoginPage'
import { createUserData } from '../../support/factories/userFactory'

describe('Login - ServeRest', () => {

  beforeEach(() => {
    LoginPage.visit()
  })

  it('Deve exibir mensagem de erro ao realizar login com credenciais inválidas', () => {

    cy.fixture('users').then((users) => {

      LoginPage.login(
        users.invalid.email,
        users.invalid.password
      )

      LoginPage.validateInvalidLoginMessage()

    })

  })


  it('Deve realizar login com credenciais válidas', () => {

    cy.fixture('users').then((users) => {

      const user = createUserData(users.admin)

      // Arrange - prepara usuário pela API
      cy.request({
        method: 'POST',
        url: `${Cypress.expose('apiUrl')}/usuarios`,
        body: user
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('_id')
      })

      // Act - login pelo Frontend
      LoginPage.login(
        user.email,
        user.password
      )

      // Assert
      cy.location('pathname', { timeout: 10000 })
        .should('not.eq', '/login')

    })

  })

})