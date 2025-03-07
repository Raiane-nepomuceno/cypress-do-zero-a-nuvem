// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from '@faker-js/faker';

Cypress.Commands.add('fillMandatoryFieldAndSubmit', () => {
    const name = faker.person.firstName();
    const sobrenome = faker.person.lastName();
    const email = faker.internet.email();
    const texto = faker.lorem.words(5);
    const telefone = faker.number.int({ min: 100000000, max: 999999999 });

    cy.get('#firstName').type(name);
    cy.get('#lastName').type(sobrenome);
    cy.get('#email').type(email);
    cy.get('#phone').type(telefone.toString()); // Garante que o telefone seja tratado como string
    cy.get('#phone-checkbox').click();
    cy.get('#open-text-area').type(texto);
    cy.contains('button', 'Enviar').click();
});

