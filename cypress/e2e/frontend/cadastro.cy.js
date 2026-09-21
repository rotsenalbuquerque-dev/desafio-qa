import RegisterPage from '../../pages/RegisterPage'
import { createUserData } from '../../support/factories/userFactory'

describe('Cadastro de usuário - ServeRest', () => {

  beforeEach(() => {
    RegisterPage.visit()
  })

  it('Deve cadastrar um novo usuário com sucesso', () => {

    cy.fixture('users').then((users) => {

      const user = createUserData(users.defaultUser)
      RegisterPage.register(user)
      RegisterPage.validateSuccessMessage()

    })

  })

})