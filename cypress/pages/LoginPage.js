class LoginPage {

  elements = {
    emailInput: () => cy.get('[data-testid="email"]'),
    passwordInput: () => cy.get('[data-testid="senha"]'),
    loginButton: () => cy.get('[data-testid="entrar"]'),
    registerButton: () => cy.get('[data-testid="cadastrar"]')
  }

  visit() {
    cy.visit('/login')
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

  clickLogin() {
    this.elements.loginButton()
      .should('be.visible')
      .and('be.enabled')
      .click()
  }

  login(email, password) {
    this.fillEmail(email)
    this.fillPassword(password)
    this.clickLogin()
  }

  validateInvalidLoginMessage() {
    cy.contains('Email e/ou senha inválidos')
      .should('be.visible')
  }

}

export default new LoginPage()