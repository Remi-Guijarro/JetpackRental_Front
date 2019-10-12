context('Jetpack update', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    const editButtonClass = '.edit-jet-button';
    const visibleState = 'be.visible';

    it('update buttons should be available', () => {
        cy.get(editButtonClass).should(visibleState);
    });

    it('modal should open when edit button is clicked', () => {
        cy.get(editButtonClass).first().click();
        cy.get('#editJetModal').should(visibleState);
    });

    it('modal should open when edit button is clicked', () => {
        cy.get(editButtonClass).first().click();
        const modal = cy.get('#editJetModal');
        modal.should(visibleState);
    });

    const imgUrl = 'https://gamepedia.cursecdn.com/fortnite_gamepedia/e/e1/Jetpack_icon.png';
    it('modal should contains jepack informations ', function () {
        cy.get(editButtonClass).first().click();
        cy.get('#modalImgUrl').invoke('val').then(value => {
            expect(value).to.be.equal(imgUrl);
        });
        cy.get('#modalJetName').invoke('val').then(value => {
            expect(value).to.be.equal('Jetpack Fortnite Wiki');
        });
    });
});
