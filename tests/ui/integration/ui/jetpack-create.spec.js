/// <reference types="Cypress" />

context('Jetpack create', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Create a jetpack', () => {
        cy.contains('Ajouter').click()
            .get('#create-form').should('be.visible')
            .get('#name').type('Test jetpack')
            .get('#image').type('image.png');
        cy.contains('Sauvegarder').click()
            .get('#jetpacks').contains('Test jetpack');
    });
});
