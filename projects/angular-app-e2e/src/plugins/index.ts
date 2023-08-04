import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin';

export const preparePlugins = (
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
): void => {
    addMatchImageSnapshotPlugin(on, config);
};
