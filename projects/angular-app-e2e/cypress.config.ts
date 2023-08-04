import { defineConfig } from 'cypress';
import { preparePlugins } from './src/plugins';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:8040',
        specPattern: 'src/e2e/**/*.ts',
        setupNodeEvents: preparePlugins,
        supportFile: './src/support/index.ts',
    },
    fileServerFolder: '.',
    fixturesFolder: './src/fixtures',
    screenshotsFolder: './src/screenshots',
    video: false,
    chromeWebSecurity: false,
    viewportWidth: 1440,
    viewportHeight: 1200,
    defaultCommandTimeout: 10000,
    retries: {
        runMode: 2,
        openMode: 0,
    },
});
