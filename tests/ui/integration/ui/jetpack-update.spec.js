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

    it('when updating image on A jetpack the displayed image must change', function () {
        cy.get(editButtonClass).first().click();
        const replacedImage = 'https://www.popageek.com/pub/media/catalog/product/cache/2a6b0744b87cbe1990f7a65c1fd3659e/p/o/popfbrkr-jetpack-view10-fortnite-battle-royale-porte-cles-jetpack.jpg';
        cy.get('#modalImgUrl').clear();
        cy.get('#modalImgUrl').type(replacedImage);
        cy.get('#modalSaveBtn').click();
        cy.get('#jetpack_a8019ec0-bfdc-4140-9dbb-4927e5ef5d8d img').should('have.attr', 'src', replacedImage);
    });
});
