/// <reference types="Cypress" />

describe('Desafio final do curso: Encontrei o gato', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('Encontrando o gato', () => {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
    })
})