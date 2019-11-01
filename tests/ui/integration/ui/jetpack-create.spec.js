/// <reference types="Cypress" />

context('Jetpack create', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Create a jetpack', () => {
        cy.contains('Ajouter').click()
            .get('#create-form').should('be.visible')
            .get('#name').type('LeJetpack')
            .get('#image').type('image.png');
        cy.contains('Sauvegarder').click()
            .get('#jetpacks').contains('LeJetpack')
            .get('#LeJetpack').should('have.attr', 'src', 'https://www.daz3d.com/media/catalog/product/cache/1/image/960x1248/17f82f742ffe127f42dca9de82fb58b1/0/0/00-main-nanoflight-jetpack-for-genesis-2-and-3-daz3d.jpg');
    });
});
