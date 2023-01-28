/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', () => {
        cy.title().should('contains', 'Central de Atendimento ao Cliente TAT')  
    })

    Cypress._.times((3), () => {
        it('Preenche os campos obrigatórios e envia o formulário', () => {
            cy.clock()
            cy.get('#firstName').type('Eduardo')
            cy.get('#lastName').type('Quaresimin Santos')
            cy.get('#email').type('eduardoquaresimin@gmail.com')
            cy.get('#open-text-area').type('Escrevendo qualquer coisa.', {delay: 0})
            cy.contains('button', 'Enviar').click()
            cy.contains('span', 'Mensagem enviada com sucesso.').should('be.visible')
            cy.tick(3000)
            cy.contains('span', 'Mensagem enviada com sucesso.').should('not.be.visible')
        })
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Quaresimin Santos')
        cy.get('#email').type('eduardoquaresimin.gmail.com')
        cy.get('#open-text-area').type('Escrevendo qualquer coisa.')
        cy.contains('button', 'Enviar').click()
        cy.contains('span', 'Valide os campos obrigatórios!').should('be.visible')
        cy.tick(3000)
        cy.contains('span', 'Valide os campos obrigatórios!').should('not.be.visible')
    })

    Cypress._.times((3), () => {
        it('Verifica que o campo Telefone aceita apenas números', () => {
            cy.get('#phone')
                .type('wasd!@#$%')
                .should('not.have.text')
        })
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Quaresimin Santos')
        cy.get('#email').type('eduardoquaresimin@gmail.com')
        cy.get('#open-text-area').type('Escrevendo qualquer coisa.')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.contains('span', 'Valide os campos obrigatórios!').should('be.visible')
        cy.tick(3000)
        cy.contains('span', 'Valide os campos obrigatórios!').should('not.be.visible')
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
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.contains('span', 'Valide os campos obrigatórios!').should('be.visible')
        cy.tick(3000)
        cy.contains('span', 'Valide os campos obrigatórios!').should('not.be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.contains('span', 'Mensagem enviada com sucesso.').should('be.visible')
        cy.tick(3000)
        cy.contains('span', 'Mensagem enviada com sucesso.').should('not.be.visible')
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
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('#email-checkbox').check()
        cy.get('#phone-checkbox').check()
        cy.get('#check').find('input').last().uncheck()
    })
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
            .should(($input) => {
                //console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', {
                action: "drag-drop"
            })
            .should(($input) => {
                //console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(($input) => {
                //console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a').should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a').invoke('removeAttr', 'target').click()
        cy.location('pathname').should('be.eq', '/src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })
      it('preenche a area de texto usando o comando invoke', () => {
        cy.get('#firstName').invoke('val', 'Teste com invoke')
            .should('have.value', 'Teste com invoke')
      })
      it('faz uma requisição HTTP', () => {
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html',
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.statusText).to.eq('OK')
            expect(res.body).to.include('CAC TAT')
        })
      })
})