describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
  
      cy.visit('./src/privacy.html');
    
    })
    it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () =>{
        cy.contains("h1","CAC TAT - Política de Privacidade").should('be.visible')
        cy.contains("p", "Talking About Testing").should('be.visible')
})
})