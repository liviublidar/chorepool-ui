describe('login page loads', () => {
  it('has texts of login page', () => {
    cy.visit('/')
    cy.contains('have an account?')
  });

  it('has login form', () => {
    cy.visit('/')
    cy.contains('have an account?')
  })
})
