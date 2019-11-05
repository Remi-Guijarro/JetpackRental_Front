context('Jetpack search', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('search for available jetpack', () => {
        cy.get('#search_id').click()
            .get('#searchArea').should('be.visible')
            .get('#start_date').type('21/12/2019 12:30');
            cy.get('body').click()
            .get('#end_date').type('22/12/2019 12:30');
            cy.get('body').click()
        cy.get('#launch_search').click()
            .get('#reset_search').should('be.visible');
        cy.get('#jetpack_a801dfjec0-bfdc-4140-edff-4927e5ef5c8d').should('be.visible')
            .get('span')
            .contains('Available');
        cy.get('#reset_search').click();
        cy.get('#start_date').should('be.empty');
        cy.get('#end_date').should('be.empty');
    });
});
