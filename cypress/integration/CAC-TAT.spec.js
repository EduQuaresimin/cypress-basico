/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', () => {
        cy.title().should('contains', 'Central de Atendimento ao Cliente TAT')  
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Quaresimin Santos')
        cy.get('#email').type('eduardoquaresimin@gmail.com')
        cy.get('#open-text-area').type('Escrevendo qualquer coisa.')
        cy.contains('button', 'Enviar').click()
        cy.contains('span', 'Mensagem enviada com sucesso.').should('be.visible')
    })
  })