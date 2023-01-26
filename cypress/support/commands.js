/// <reference types="Cypress" />

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Eduardo')
    cy.get('#lastName').type('Quaresimin Santos')
    cy.get('#email').type('eduardoquaresimin@gmail.com')
    cy.get('#open-text-area').type('Escrevendo qualquer coisa.')
    cy.contains('button', 'Enviar').click()
})