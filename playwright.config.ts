import { devices, PlaywrightTestConfig, ReporterDescription } from '@playwright/test';
import os from 'node:os';

enum Reporter {
    HTML = 'html',
    List = 'list',
    CI = 'github'
}

/**
 * Customize reporters.
 * By default, we want to have a standard list reporting and a pretty HTML output.
 * In CI pipelines, we want to have an annotated report visible on the GitHub Actions page.
 */
const addReporter = (): ReporterDescription[] => {
    const defaultReporter: ReporterDescription[] = [
        [Reporter.List],
        [Reporter.HTML],
    ];

    if (isPipeline) {
        return defaultReporter.concat([[Reporter.CI]]);
    }

    return defaultReporter;
}

// Default development URL - change if necessary
const DEV_URL = 'http://localhost:3000';

// Check whether tests are running as part of a CI/CD pipeline
const isPipeline = !!process.env.CI;

// Match pixel comparison at least 95 % to avoid flaky tests but ensure enough confidence
const threshold = 0.95;

// Use all the logical cores available for maximum performance
const workers = '100%';

// Ensure we are not wasting build minutes in CI by operating in a fail-fast mode
const maxFailures = isPipeline ? 1 : undefined;

// Increase the default test timeout to 60 seconds to allow more resiliency
const timeout = 60 * 1000;

// Potentially interesting metadata to append into the test report – might help with debugging
const metadata: Record<string, string> = {
    cpu: os.arch(),
    memory: `${os.totalmem() / (1024 ** 2)} MB`,
    hostname: os.hostname(),
    system: os.type(),
    kernel: os.version(),
};

const config: PlaywrightTestConfig = {
    name: 'Playwright Acceptance Test Suite',
    preserveOutput: 'failures-only',
    testDir: 'tests',
    fullyParallel: true,
    forbidOnly: isPipeline,
    reporter: addReporter(),
    retries: 1,
    timeout,
    workers,
    metadata,
    maxFailures,
    webServer: process.env.APP_URL
        ? undefined
        : {
            command: 'yarn serve',
            url: DEV_URL,
            reuseExistingServer: !isPipeline,
            timeout: 120 * 1000,
        },
    use: {
        headless: true,
        baseURL: process.env.APP_URL ?? DEV_URL,
        userAgent: 'Microsoft Playwright',
        locale: 'en-GB',
        colorScheme: 'dark',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
    expect: {
        toMatchSnapshot: { threshold },
    },
    projects: [
        {
            name: 'Firefox',
            ...devices[ 'Desktop Firefox' ],
        },
        {
            name: 'Chromium',
            ...devices[ 'Desktop Chrome' ],
        },
        {
            name: 'Edge',
            ...devices[ 'Desktop Edge' ],
        },
        {
            name: 'Safari',
            ...devices[ 'Desktop Safari' ],
        },
        {
            name: 'iPhone 13',
            ...devices[ 'iPhone 13' ],
        },
        {
            name: 'Pixel 5',
            ...devices[ 'Pixel 5' ],
        }
    ]
};

export default config;
