/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', () => {
        cy.title().should('contains', 'Central de Atendimento ao Cliente TAT')  
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Quaresimin Santos')
        cy.get('#email').type('eduardoquaresimin@gmail.com')
        cy.get('#open-text-area').type('Escrevendo qualquer coisa.', {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.contains('span', 'Mensagem enviada com sucesso.').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Quaresimin Santos')
        cy.get('#email').type('eduardoquaresimin.gmail.com')
        cy.get('#open-text-area').type('Escrevendo qualquer coisa.')
        cy.contains('button', 'Enviar').click()
        cy.contains('span', 'Valide os campos obrigatórios!').should('be.visible')
    })

    it('Verifica que o campo Telefone aceita apenas números', () => {
        cy.get('#phone')
            .type('wasd!@#$%')
            .should('not.have.text')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Quaresimin Santos')
        cy.get('#email').type('eduardoquaresimin@gmail.com')
        cy.get('#open-text-area').type('Escrevendo qualquer coisa.')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.contains('span', 'Valide os campos obrigatórios!').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Eduardo').should('have.value', 'Eduardo')
            .clear().should('have.value', '')
        cy.get('#lastName').type('Quaresimin Santos').should('have.value', 'Quaresimin Santos')
            .clear().should('have.value', '')
        cy.get('#email').type('eduardoquaresimin@gmail.com').should('have.value', 'eduardoquaresimin@gmail.com')
            .clear().should('have.value', '')
        cy.get('#phone').type('47999112310').should('have.value', '47999112310')
            .clear().should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        cy.contains('span', 'Valide os campos obrigatórios!').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.contains('span', 'Mensagem enviada com sucesso.').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu texto', () => {
        cy.get('#product')
            .select(3)
            .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu texto', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[value=feedback]').check()
            .should('be.checked')
    })
    it('marca cada tipo de atendimento', () => {
        cy.get('input[value=ajuda]').check()
            .should('be.checked')
        cy.get('input[value=elogio]').check()
            .should('be.checked')
        cy.get('input[value=feedback]').check()
            .should('be.checked')
    })
    it.only('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('#email-checkbox').check()
        cy.get('#phone-checkbox').check()
        cy.get('#check').find('input').last().uncheck()
    })
})