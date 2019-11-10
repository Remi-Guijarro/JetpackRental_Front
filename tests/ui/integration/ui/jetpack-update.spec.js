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

    it('modal should contains jepack informations ', () => {
        const imgUrl = 'https://gamepedia.cursecdn.com/fortnite_gamepedia/e/e1/Jetpack_icon.png';
        cy.get(editButtonClass).first().click();
        cy.get('#modalImgUrl').invoke('val').then(value => {
            expect(value).to.be.equal(imgUrl);
        });
        cy.get('#modalJetName').invoke('val').then(value => {
            expect(value).to.be.equal('Jetpack Fortnite Wiki');
        });
    });


    /*it('when updating image on A jetpack the displayed image must change', () => {
        const newImgUrl = 'https://image.businessinsider.com/5b04162483387ac3188b4680?width=1100&format=jpeg&auto=webp';
        cy.get(editButtonClass).first().click();
        cy.get('#modalImgUrl').clear();
        cy.get('#modalImgUrl').type(newImgUrl);
        cy.get('#modalSaveBtn').click();
        cy.get('#jetpack_a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d img').should('have.attr', 'src', newImgUrl);
    });*/
});
