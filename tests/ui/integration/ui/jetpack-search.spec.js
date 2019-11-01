/// <reference types="Cypress" />

context('Jetpack search', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Go to search/booking page', () => {
        cy.contains('Réserver').click()
            .get('#create-form').should('be.visible')
            .get('#name').type('Test jetpack')
            .get('#image').type('image.png');
        cy.contains('Sauvegarder').click()
            .get('#jetpacks').contains('Test jetpack');
    });
});
