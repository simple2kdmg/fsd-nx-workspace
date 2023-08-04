import { DefaultPageObject } from '../page-objects/default-page.po';

describe('DefaultPage integration', () => {
    beforeEach(() => cy.visit('/default-page'));

    it('Should display correct title', () => {
        const defaultPage = new DefaultPageObject();

        defaultPage.title.should('have.text', 'Default page');
    });
});
