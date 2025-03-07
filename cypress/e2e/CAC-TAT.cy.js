
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {

    cy.visit('./src/index.html');
  
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
 
  })
  
 it('preenche os campos obrigatórios e envia o formulário', () => {
  const lonText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz',10);
    
    cy.get('#firstName').type("Raiane");

    cy.get('#lastName').type("Nepomuceno");

    cy.get('#email').type("teste@teste.com");

    cy.get('#phone').type("14997996320");

    cy.get('#product').select("Blog");

    cy.get('[for="email-checkbox"]').click();

    cy.get('#open-text-area').type(lonText, {delay:0});

    //cy.get('#file-upload').click();
    cy.contains('button', 'Enviar').click();

    cy.get('.success')
       .as('sucess')
    
    cy.get('@sucess')
       .should("be.visible")
       .contains("Mensagem enviada com sucesso."); 
})
it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
  cy.get('#firstName').type("Raiane");
  cy.get('#lastName').type("Nepomuceno");
  cy.get('#email').type("teste.com");
  cy.contains('button', 'Enviar').click();

  cy.get('.error')
    .should("be.visible")
    .contains("Valide os campos obrigatórios!")
 
})
it("valida campo telefone valor não númerico",() =>{
  cy.get('#phone')
    .type("teste1")
    .should("have.value", '');

})
it("exibe mensagem de erro quando o telefone se torna obrigat[orio mas não é preenchido antes do envio do formulário", () =>{
  cy.get('#firstName').type("Raiane");
  cy.get('#lastName').type("Nepomuceno");
  cy.get('#email').type("teste.com");
  cy.get('#phone-checkbox').check();
  //ccy.get("input[type='checkbox'][value='phone']").check();
  cy.get('#open-text-area').type("Teste");

  cy.contains('button', 'Enviar').click();

  cy.get('.error')
  .should("be.visible")
  .contains("Valide os campos obrigatórios!")


})
it("preenche e limpa os campos: nome, sobrenome, email e telefone", () =>{
  cy.get('#firstName').type("Raiane")
    .should('have.value', "Raiane")
    .clear().should('have.value', '');

  cy.get('#lastName').type("Nepomuceno")
    .should('have.value', "Nepomuceno")
    .clear()
    .should('have.value', '');

  cy.get('#email').type("teste.com")
      .should('have.value', "teste.com")
      .clear()
      .should('have.value', '');

  cy.get('#phone').type("14997996320")
    .should('have.value', "14997996320")
    .clear()
    .should('have.value', '');

  cy.get('#phone-checkbox').click();

})

it("exibe mensagem de erro ao submeter os campos obrigatórios", () =>{
  cy.get('.button[type="submit"]').click();
  cy.get('.error')
  .should("be.visible")
  .contains("Valide os campos obrigatórios!")

})
it("envia o formulário com sucesso usando um comando customizado", () => {
     cy.fillMandatoryFieldAndSubmit();
     cy.get('.success')
     .should("be.visible")
     .contains("Mensagem enviada com sucesso."); 

    }) 
  it("seleciona um produto (Youtube) por seu texto",()=>{
    cy.get('#product').select("YouTube")
      .should('have.value', 'youtube');

  })
  it("seleciona um produto (Mentoria) por seu valor",()=>{
    cy.get('#product').select("mentoria")
      .should('have.value', 'mentoria');

  })

  it("seleciona um produto (Blog) por seu índice",()=>{
    cy.get('#product').select(1)
      .should('have.value', 'blog');

  })
  it("marca o tipo de atendimento 'Feedback'",()=>{

    //cy.get('#support-type').check("Feedback")
    cy.get('input[type="radio"][value="feedback"]').check() // Check first radio element
      .should('be.checked'); 

  })
  it("marca cada tipo de atendimento",() =>{
    cy.get('input[type="radio"]')
      .each((typeOfService =>{
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      }))
  } )
  it("marcando e desmarcando o input tipo checkbox",()=>{
    cy.get('input[type="checkbox"][value="email"]').check()
    cy.get('[type="checkbox"]').uncheck()
  })
  it("marca ambos os checkboxs, depois dermarca o último", () =>{
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')

  })
  it("fazendo upload de arquivos com Cypress", () =>{
    cy.get('#file-upload')
      .selectFile('./src/Teste.jpg')
      .should(input =>{
        console.log(input)
        expect(input[0].files[0].name).to.equal('Teste.jpg');
      })    
  })
  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get('#file-upload')
      .selectFile('./src/Teste.jpg', {action:'drag-drop'})
      .should(input =>{
        console.log(input)
        expect(input[0].files[0].name).to.equal('Teste.jpg');
      })    

  })
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should(input =>{
      console.log(input)
      expect(input[0].files[0].name).to.equal('example.json');
    })    

  })
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () =>{
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href','privacy.html')
      .and('have.attr', 'target', '_blank')
  })


})
