import { UserAgent } from '../enums/user-agent.enum';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            visit(
                url: string,
                options?: Partial<Cypress.CyVisitOptions>
            ): Chainable<AUTWindow>;

            getByAutomationId(id: string): Chainable<JQuery<Node>>;
        }

        interface CyVisitOptions extends Cypress.VisitOptions {
            userAgent?: UserAgent;
            canShare?: boolean;
            clipboardReadWriteAllowed?: boolean;
        }
    }
}

Cypress.Commands.overwrite(
    'visit',
    (
        originalFn,
        path: string,
        options: Partial<Cypress.CyVisitOptions> = {}
    ) => {
        setUserAgent(options.userAgent);
        mockCanShareMethod(options.canShare);
        allowClipboardReadWrite(options.clipboardReadWriteAllowed);

        return originalFn(path, options);
    }
);

const byAutomationId = (id: string) => `[automation-id=${id}]`;

Cypress.Commands.add(
    'getByAutomationId',
    {
        prevSubject: 'optional',
    },
    (subject, id: string) => {
        return subject
            ? cy.wrap(subject).find(byAutomationId(id))
            : cy.get(byAutomationId(id));
    }
);

function setUserAgent(userAgent?: UserAgent) {
    userAgent &&
        cy.once('window:before:load', (win) =>
            Object.defineProperty(win.navigator, 'userAgent', {
                value: userAgent,
            })
        );
}

function mockCanShareMethod(canShare?: boolean) {
    canShare &&
        cy.once('window:before:load', (win) =>
            Object.defineProperty(win.navigator, 'canShare', {
                value: () => true,
            })
        );
}

function allowClipboardReadWrite(allowed?: boolean) {
    allowed &&
        cy.wrap(
            Cypress.automation('remote:debugger:protocol', {
                command: 'Browser.grantPermissions',
                params: {
                    permissions: [
                        'clipboardReadWrite',
                        'clipboardSanitizedWrite',
                    ],
                    origin: window.location.origin,
                },
            })
        );
}
