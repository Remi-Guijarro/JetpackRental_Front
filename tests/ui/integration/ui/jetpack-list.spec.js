/// <reference types="Cypress" />

context('Jetpack list', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Display all jetpacks', () => {
        cy.get('#jetpacks')
            .should('be.visible')
            .contains('Jetpack Fortnite Wiki')
            .get('#jetpack_a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d img')
                .should('have.attr', 'src', 'https://gamepedia.cursecdn.com/fortnite_gamepedia/e/e1/Jetpack_icon.png')
        cy.get('#jetpacks')
            .should('be.visible')
            .contains('Jetpack JackTalior')
            .get('#jetpack_a801dfjec0-bfdc-4140-edff-4927e5ef5c8d img')
                .should('have.attr', 'src', 'http://www.slate.fr/sites/default/files/styles/1060x523/public/backviewjetpack.jpg')
    });
});
