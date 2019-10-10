context('Jetpack update', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('update button should be available', () => {
        cy.get('.edit-jet-button').should('be.visible');
    });
});