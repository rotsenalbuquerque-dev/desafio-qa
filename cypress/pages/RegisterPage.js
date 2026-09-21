class RegisterPage {

  elements = {
    nameInput: () => cy.get('[data-testid="nome"]'),
    emailInput: () => cy.get('[data-testid="email"]'),
    passwordInput: () => cy.get('[data-testid="password"]'),
    registerButton: () => cy.get('[data-testid="cadastrar"]')
  }

  visit() {
    cy.visit('/cadastrarusuarios')
  }

  fillName(name) {
    this.elements.nameInput()
      .should('be.visible')
      .type(name)
  }

  fillEmail(email) {
    this.elements.emailInput()
      .should('be.visible')
      .type(email)
  }

  fillPassword(password) {
    this.elements.passwordInput()
      .should('be.visible')
      .type(password)
  }

  clickRegister() {
    this.elements.registerButton()
      .should('be.visible')
      .and('be.enabled')
      .click()
  }

  register(user) {
    this.fillName(user.nome)
    this.fillEmail(user.email)
    this.fillPassword(user.password)
    this.clickRegister()
  }

  validateSuccessMessage() {
    cy.contains('Cadastro realizado com sucesso', {
      timeout: 10000
    }).should('be.visible')
  }
}

export default new RegisterPage()