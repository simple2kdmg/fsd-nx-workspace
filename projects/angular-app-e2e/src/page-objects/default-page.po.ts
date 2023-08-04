import Chainable = Cypress.Chainable;

export class DefaultPageObject {
    get title(): Chainable<JQuery<Node>> {
        return cy.getByAutomationId('dp-title');
    }
}
