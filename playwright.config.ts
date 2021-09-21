import { PlaywrightTestConfig, devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
    testDir: 'tests',
    outputDir: 'results',
    forbidOnly: !!process.env.CI,
    reporter: 'list',
    webServer: process.env.APP_URL
        ? undefined
        : {
            command: 'yarn serve',
            port: 3000,
            reuseExistingServer: true,
        },
    use: {
        baseURL: process.env.APP_URL ?? 'http://localhost:3000',
        screenshot: process.env.CI ? 'only-on-failure' : 'off',
        video: process.env.CI ? 'retain-on-failure' : 'off',
        trace: process.env.CI ? 'retain-on-failure' : 'off',
    },
    projects: [
        {
            ...devices[ 'Desktop Firefox' ],
            name: 'Firefox',
            use: { browserName: 'firefox' }
        },
        {
            ...devices[ 'iPhone 12' ],
            name: 'iPhone',
            use: { browserName: 'webkit' }
        }
    ]
};

export default config;
