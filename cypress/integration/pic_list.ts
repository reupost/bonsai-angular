describe('Pic list tests', () => {
    it('Does it load', () => {
        cy.visit('/pic');
        cy.get('#picCountText').contains(/\d/);
    }),
    it('Is first pic selectable', () => {
        cy.visit('/pic');
        cy.get('#picListTableTitleRow').next().click();
        cy.get('#updateSelectedPicButton').contains('Update');
    })
  });
